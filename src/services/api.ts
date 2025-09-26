import axios from 'axios';
import type {HumanBeing, HumanBeingCreateRequest, HumanBeingUpdateRequest, PaginatedResponse, WeaponType} from '../types';

const API_BASE_URL = '/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const humanBeingService = {
    // Получить все записи с пагинацией
    getAll: async (page: number = 0, size: number = 10, search?: string): Promise<PaginatedResponse<HumanBeing>> => {
        const params: any = { page, size };
        if (search) params.search = search;

        const response = await api.get('/human-beings', { params });
        return response.data;
    },

    // Получить по ID
    getById: async (id: number): Promise<HumanBeing> => {
        const response = await api.get(`/human-beings/${id}`);
        return response.data;
    },

    // Создать новую запись
    create: async (data: HumanBeingCreateRequest): Promise<HumanBeing> => {
        const response = await api.post('/human-beings', data);
        return response.data;
    },

    // Обновить запись
    update: async (id: number, data: HumanBeingUpdateRequest): Promise<HumanBeing> => {
        const response = await api.put(`/human-beings/${id}`, data);
        return response.data;
    },

    // Удалить запись
    delete: async (id: number): Promise<void> => {
        await api.delete(`/human-beings/${id}`);
    },

    // Специальные операции
    deleteAllByWeaponType: async (weaponType: WeaponType): Promise<void> => {
        await api.delete(`/human-beings/weapon-type/${weaponType}/all`);
    },

    deleteOneByWeaponType: async (weaponType: WeaponType): Promise<void> => {
        await api.delete(`/human-beings/weapon-type/${weaponType}/one`);
    },

    groupBySoundtrackName: async (): Promise<Record<string, number>> => {
        const response = await api.get('/human-beings/group/soundtrack');
        return response.data;
    },

    updateAllMoodToSadness: async (): Promise<void> => {
        await api.patch('/human-beings/mood/sadness');
    },

    assignCarToHeroesWithoutCar: async (): Promise<void> => {
        await api.patch('/human-beings/car/assign');
    },
};