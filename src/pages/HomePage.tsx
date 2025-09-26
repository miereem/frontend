import React, { useState, useEffect } from 'react';
import { Plus, Search } from 'lucide-react';
import type { HumanBeing, PaginatedResponse } from '../types';
import { humanBeingService } from '../services/api';
import { HumanBeingTable } from '../components/tables/HumanBeingTable.tsx';
import { HumanBeingForm } from '../components/forms/HumanBeingForm';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';

export const HomePage: React.FC = () => {
    const [humanBeings, setHumanBeings] = useState<HumanBeing[]>([]);
    const [pagination, setPagination] = useState({ page: 0, size: 10, total: 0 });
    const [searchTerm, setSearchTerm] = useState('');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingHuman, setEditingHuman] = useState<HumanBeing | null>(null);
    const [loading, setLoading] = useState(false);

    const loadHumanBeings = async (page: number = 0) => {
        setLoading(true);
        try {
            const response: PaginatedResponse<HumanBeing> = await humanBeingService.getAll(
                page,
                pagination.size,
                searchTerm || undefined
            );
            setHumanBeings(response.content);
            setPagination(prev => ({
                ...prev,
                page: response.number,
                total: response.totalElements
            }));
        } catch (error) {
            console.error('Error loading human beings:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadHumanBeings();
    }, [searchTerm]);

    const handleCreate = async (data: any) => {
        try {
            await humanBeingService.create(data);
            setIsFormOpen(false);
            loadHumanBeings();
        } catch (error) {
            console.error('Error creating human being:', error);
        }
    };

    const handleEdit = (human: HumanBeing) => {
        setEditingHuman(human);
        setIsFormOpen(true);
    };

    const handleUpdate = async (data: any) => {
        if (!editingHuman) return;

        try {
            await humanBeingService.update(editingHuman.id, { ...data, id: editingHuman.id });
            setIsFormOpen(false);
            setEditingHuman(null);
            loadHumanBeings();
        } catch (error) {
            console.error('Error updating human being:', error);
        }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this human being?')) {
            try {
                await humanBeingService.delete(id);
                loadHumanBeings();
            } catch (error) {
                console.error('Error deleting human being:', error);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Human Beings Management</h1>
                    <p className="mt-2 text-sm text-gray-600">Manage your human beings collection</p>
                </div>

                {/* Toolbar */}
                <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search by name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
                        />
                    </div>

                    <Button
                        onClick={() => {
                            setEditingHuman(null);
                            setIsFormOpen(true);
                        }}
                        icon={Plus}
                    >
                        Add Human Being
                    </Button>
                </div>

                {/* Table */}
                <HumanBeingTable
                    humanBeings={humanBeings}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    loading={loading}
                    pagination={pagination}
                    onPageChange={loadHumanBeings}
                />

                {/* Modal */}
                <Modal
                    isOpen={isFormOpen}
                    onClose={() => {
                        setIsFormOpen(false);
                        setEditingHuman(null);
                    }}
                    title={editingHuman ? 'Edit Human Being' : 'Create Human Being'}
                >
                    <HumanBeingForm
                        onSubmit={editingHuman ? handleUpdate : handleCreate}
                        onCancel={() => {
                            setIsFormOpen(false);
                            setEditingHuman(null);
                        }}
                        initialData={editingHuman || undefined}
                    />
                </Modal>
            </div>
        </div>
    );
};