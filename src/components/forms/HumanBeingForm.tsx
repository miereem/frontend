import React from 'react';
import { useForm } from 'react-hook-form';
import {type HumanBeing, type HumanBeingCreateRequest, Mood, WeaponType } from '../../types';
import { Button } from '../ui/Button';

interface HumanBeingFormProps {
    onSubmit: (data: HumanBeingCreateRequest) => void;
    onCancel: () => void;
    initialData?: HumanBeing;
    loading?: boolean;
}

export const HumanBeingForm: React.FC<HumanBeingFormProps> = ({
                                                                  onSubmit,
                                                                  onCancel,
                                                                  initialData,
                                                                  loading = false
                                                              }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<HumanBeingCreateRequest>({
        defaultValues: initialData ? {
            name: initialData.name,
            coordinates: initialData.coordinates,
            realHero: initialData.realHero,
            hasToothpick: initialData.hasToothpick,
            car: initialData.car,
            mood: initialData.mood,
            impactSpeed: initialData.impactSpeed,
            soundtrackName: initialData.soundtrackName,
            weaponType: initialData.weaponType,
        } : {}
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Name *</label>
                    <input
                        {...register('name', { required: 'Name is required' })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
                </div>

                {/* Coordinates */}
                <div className="sm:col-span-2 grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Coordinate X *</label>
                        <input
                            type="number"
                            {...register('coordinates.x', {
                                required: 'X is required',
                                max: { value: 15, message: 'X cannot exceed 15' }
                            })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Coordinate Y *</label>
                        <input
                            type="number"
                            step="0.01"
                            {...register('coordinates.y', {
                                required: 'Y is required',
                                max: { value: 277, message: 'Y cannot exceed 277' }
                            })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>
                </div>

                {/* Other fields... */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Impact Speed *</label>
                    <input
                        type="number"
                        step="0.01"
                        {...register('impactSpeed', {
                            required: 'Impact speed is required',
                            max: { value: 664, message: 'Impact speed cannot exceed 664' }
                        })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>

                {/* Weapon Type */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Weapon Type *</label>
                    <select
                        {...register('weaponType', { required: 'Weapon type is required' })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                        <option value="">Select weapon type</option>
                        {Object.values(WeaponType).map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>

                {/* Mood */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Mood</label>
                    <select
                        {...register('mood')}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                        <option value="">Select mood</option>
                        {Object.values(Mood).map(mood => (
                            <option key={mood} value={mood}>{mood}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="flex justify-end space-x-3">
                <Button type="button" variant="secondary" onClick={onCancel}>
                    Cancel
                </Button>
                <Button type="submit" loading={loading}>
                    {initialData ? 'Update' : 'Create'}
                </Button>
            </div>
        </form>
    );
};