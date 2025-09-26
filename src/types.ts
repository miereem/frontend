export interface Coordinates {
    x: number;
    y: number;
}

export interface Car {
    name: string;
    cool: boolean;
}

// @ts-ignore
export enum Mood {
    SADNESS = 'SADNESS',
    LONGING = 'LONGING',
    GLOOM = 'GLOOM'
}

// @ts-ignore
export enum WeaponType {
    HAMMER = 'HAMMER',
    PISTOL = 'PISTOL',
    KNIFE = 'KNIFE',
    MACHINE_GUN = 'MACHINE_GUN'
}

export interface HumanBeing {
    id: number;
    name: string;
    coordinates: Coordinates;
    creationDate: string;
    realHero: boolean;
    hasToothpick?: boolean;
    car?: Car;
    mood?: Mood;
    impactSpeed: number;
    soundtrackName: string;
    weaponType: WeaponType;
}

export interface HumanBeingCreateRequest {
    name: string;
    coordinates: Coordinates;
    realHero: boolean;
    hasToothpick?: boolean;
    car?: Car;
    mood?: Mood;
    impactSpeed: number;
    soundtrackName: string;
    weaponType: WeaponType;
}

export interface HumanBeingUpdateRequest extends HumanBeingCreateRequest {
    id: number;
}

export interface ApiResponse<T> {
    success: boolean;
    message?: string;
    data?: T;
    error?: string;
}

export interface PaginatedResponse<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
}