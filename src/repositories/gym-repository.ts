import { Prisma, Gym } from '@prisma/client';

export interface FindManyNearby {
    latitude: number;
    longitude: number;
}

export interface GymRepository {
    create(data: Prisma.GymCreateInput): Promise<Gym>;
    findById(id: string): Promise<Gym | null>;
    searchMany(query: string): Promise<Gym[]>;
    findManyNearby(params: FindManyNearby): Promise<Gym[]>;
}