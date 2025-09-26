import React, { useState } from 'react';
import { Trash2, Users, Music, Car, AlertTriangle } from 'lucide-react';
import { WeaponType } from '../types/HumanBeing';
import { humanBeingService } from '../services/api';
import { Button } from '../components/ui/Button';

interface OperationInput {
    type: 'select' | 'text' | 'number';
    name: string;
    label: string;
    options?: string[];
    required?: boolean;
}

interface Operation {
    id: string;
    title: string;
    description: string;
    icon: React.ComponentType<any>;
    inputs?: OperationInput[];
    execute: (data?: any) => Promise<any>;
}

export const SpecialOperationsPage: React.FC = () => {
    const [loading, setLoading] = useState<string | null>(null);
    const [result, setResult] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
    const [operationData, setOperationData] = useState<Record<string, any>>({});

    const executeOperation = async (operation: Operation) => {
        setLoading(operation.id);
        setResult(null);

        try {
            // Если операция требует данные, передаем их
            const data = operation.inputs ? operationData[operation.id] : undefined;
            const result = await operation.execute(data);

            if (operation.id === 'group-by-soundtrack') {
                // Специальная обработка для группировки
                const groupResult = Object.entries(result as Record<string, number>)
                    .map(([soundtrack, count]) => `${soundtrack}: ${count} human beings`)
                    .join('\n');
                setResult({ type: 'success', message: `Grouping completed:\n${groupResult}` });
            } else {
                setResult({ type: 'success', message: `${operation.title} completed successfully!` });
            }
        } catch (error: any) {
            setResult({ type: 'error', message: `Error during ${operation.title}: ${error.message}` });
        } finally {
            setLoading(null);
        }
    };

    const handleInputChange = (operationId: string, fieldName: string, value: any) => {
        setOperationData(prev => ({
            ...prev,
            [operationId]: {
                ...prev[operationId],
                [fieldName]: value
            }
        }));
    };

    const operations: Operation[] = [
        {
            id: 'delete-by-weapon',
            title: 'Delete All by Weapon Type',
            description: 'Remove all human beings with specified weapon type',
            icon: Trash2,
            inputs: [
                {
                    type: 'select',
                    name: 'weaponType',
                    label: 'Weapon Type',
                    options: Object.values(WeaponType),
                    required: true
                }
            ],
            execute: (data: { weaponType: WeaponType }) => humanBeingService.deleteAllByWeaponType(data.weaponType)
        },
        {
            id: 'delete-one-by-weapon',
            title: 'Delete One by Weapon Type',
            description: 'Remove one human being with specified weapon type',
            icon: Trash2,
            inputs: [
                {
                    type: 'select',
                    name: 'weaponType',
                    label: 'Weapon Type',
                    options: Object.values(WeaponType),
                    required: true
                }
            ],
            execute: (data: { weaponType: WeaponType }) => humanBeingService.deleteOneByWeaponType(data.weaponType)
        },
        {
            id: 'group-by-soundtrack',
            title: 'Group by Soundtrack',
            description: 'Count human beings grouped by soundtrack name',
            icon: Music,
            execute: () => humanBeingService.groupBySoundtrackName()
        },
        {
            id: 'update-mood',
            title: 'Update All Moods to Sadness',
            description: 'Set mood to SADNESS for all human beings',
            icon: Users,
            execute: () => humanBeingService.updateAllMoodToSadness()
        },
        {
            id: 'assign-cars',
            title: 'Assign Cars to Heroes',
            description: 'Give red Lada Kalina to all heroes without cars',
            icon: Car,
            execute: () => humanBeingService.assignCarToHeroesWithoutCar()
        }
    ];

    const isOperationDisabled = (operation: Operation): boolean => {
        if (!operation.inputs) return false;

        const operationInputData = operationData[operation.id] || {};
        return operation.inputs.some(input =>
            input.required && !operationInputData[input.name]
        );
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Special Operations</h1>
                    <p className="mt-2 text-sm text-gray-600">Perform bulk operations on human beings</p>
                </div>

                {result && (
                    <div className={`mb-6 p-4 rounded-lg ${
                        result.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                    }`}>
                        <pre className="whitespace-pre-wrap">{result.message}</pre>
                    </div>
                )}

                <div className="grid gap-6 md:grid-cols-2">
                    {operations.map((operation) => (
                        <div key={operation.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0">
                                    <operation.icon className="h-6 w-6 text-blue-600" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-medium text-gray-900">{operation.title}</h3>
                                    <p className="mt-1 text-sm text-gray-600">{operation.description}</p>

                                    {/* Поля ввода для операций с параметрами */}
                                    {operation.inputs && (
                                        <div className="mt-4 space-y-3">
                                            {operation.inputs.map((input) => (
                                                <div key={input.name}>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        {input.label}
                                                        {input.required && <span className="text-red-500 ml-1">*</span>}
                                                    </label>
                                                    {input.type === 'select' ? (
                                                        <select
                                                            value={operationData[operation.id]?.[input.name] || ''}
                                                            onChange={(e) => handleInputChange(operation.id, input.name, e.target.value)}
                                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                            required={input.required}
                                                        >
                                                            <option value="">Select {input.label}</option>
                                                            {input.options?.map((option) => (
                                                                <option key={option} value={option}>{option}</option>
                                                            ))}
                                                        </select>
                                                    ) : (
                                                        <input
                                                            type={input.type}
                                                            value={operationData[operation.id]?.[input.name] || ''}
                                                            onChange={(e) => handleInputChange(operation.id, input.name, e.target.value)}
                                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                            required={input.required}
                                                        />
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    <div className="mt-4">
                                        <Button
                                            variant="primary"
                                            onClick={() => executeOperation(operation)}
                                            loading={loading === operation.id}
                                            disabled={!!loading || isOperationDisabled(operation)}
                                            icon={AlertTriangle}
                                        >
                                            Execute Operation
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};