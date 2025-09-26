import React from 'react';
import { Edit, Trash2, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { type HumanBeing, Mood, WeaponType } from '../../types/HumanBeing';
import { Button } from '../ui/Button';

interface HumanBeingTableProps {
    humanBeings: HumanBeing[];
    onEdit: (human: HumanBeing) => void;
    onDelete: (id: number) => void;
    onView?: (human: HumanBeing) => void;
    loading?: boolean;
    pagination?: {
        page: number;
        size: number;
        total: number;
    };
    onPageChange?: (page: number) => void;
}

export const HumanBeingTable: React.FC<HumanBeingTableProps> = ({
                                                                    humanBeings,
                                                                    onEdit,
                                                                    onDelete,
                                                                    onView,
                                                                    loading = false,
                                                                    pagination,
                                                                    onPageChange
                                                                }) => {
    const totalPages = pagination ? Math.ceil(pagination.total / pagination.size) : 0;
    const currentPage = pagination?.page || 0;

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getMoodColor = (mood?: Mood) => {
        switch (mood) {
            case Mood.SADNESS: return 'bg-blue-100 text-blue-800';
            case Mood.LONGING: return 'bg-purple-100 text-purple-800';
            case Mood.GLOOM: return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getWeaponColor = (weaponType: WeaponType) => {
        switch (weaponType) {
            case WeaponType.HAMMER: return 'bg-orange-100 text-orange-800';
            case WeaponType.PISTOL: return 'bg-red-100 text-red-800';
            case WeaponType.KNIFE: return 'bg-yellow-100 text-yellow-800';
            case WeaponType.MACHINE_GUN: return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    if (loading) {
        return (
            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
            </div>
        );
    }

    if (humanBeings.length === 0) {
        return (
            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                <div className="text-center py-12">
                    <div className="text-gray-500 text-lg">No human beings found</div>
                    <div className="text-gray-400 text-sm mt-2">
                        {pagination?.total === 0 ?
                            "Start by creating your first human being" :
                            "Try adjusting your search criteria"
                        }
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            ID
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Coordinates
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Real Hero
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Impact Speed
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Weapon Type
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Mood
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Created
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {humanBeings.map((human) => (
                        <tr key={human.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                #{human.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                <div className="font-medium">{human.name}</div>
                                <div className="text-gray-500 text-xs">{human.soundtrackName}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                ({human.coordinates.x}, {human.coordinates.y})
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      human.realHero ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {human.realHero ? 'Yes' : 'No'}
                  </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {human.impactSpeed.toFixed(2)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getWeaponColor(human.weaponType)}`}>
                    {human.weaponType}
                  </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {human.mood && (
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getMoodColor(human.mood)}`}>
                      {human.mood}
                    </span>
                                )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {formatDate(human.creationDate)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <div className="flex justify-end space-x-2">
                                    {onView && (
                                        <Button
                                            variant="secondary"
                                            size="sm"
                                            onClick={() => onView(human)}
                                            icon={Eye}
                                            title="View details"
                                        />
                                    )}
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        onClick={() => onEdit(human)}
                                        icon={Edit}
                                        title="Edit"
                                    />
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => onDelete(human.id)}
                                        icon={Trash2}
                                        title="Delete"
                                    />
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {pagination && onPageChange && totalPages > 1 && (
                <div className="bg-white px-6 py-3 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-700">
                            Showing <span className="font-medium">{(currentPage * pagination.size) + 1}</span> to{' '}
                            <span className="font-medium">
                {Math.min((currentPage + 1) * pagination.size, pagination.total)}
              </span>{' '}
                            of <span className="font-medium">{pagination.total}</span> results
                        </div>

                        <div className="flex space-x-2">
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => onPageChange(currentPage - 1)}
                                disabled={currentPage === 0}
                                icon={ChevronLeft}
                            >
                                Previous
                            </Button>

                            <div className="flex items-center space-x-1">
                                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                    let pageNum;
                                    if (totalPages <= 5) {
                                        pageNum = i;
                                    } else if (currentPage <= 2) {
                                        pageNum = i;
                                    } else if (currentPage >= totalPages - 3) {
                                        pageNum = totalPages - 5 + i;
                                    } else {
                                        pageNum = currentPage - 2 + i;
                                    }

                                    return (
                                        <Button
                                            key={pageNum}
                                            variant={currentPage === pageNum ? 'primary' : 'secondary'}
                                            size="sm"
                                            onClick={() => onPageChange(pageNum)}
                                            className="min-w-[2.5rem]"
                                        >
                                            {pageNum + 1}
                                        </Button>
                                    );
                                })}
                            </div>

                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => onPageChange(currentPage + 1)}
                                disabled={currentPage >= totalPages - 1}
                                icon={ChevronRight}
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};