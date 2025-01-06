import { Checkin, Prisma } from '@prisma/client';

export interface CheckinRepository {
    create(data: Prisma.CheckinUncheckedCreateInput): Promise<Checkin>;
    save(data: Checkin): Promise<Checkin>;
    findByUserIdOnDate(userId: string, date: Date): Promise<Checkin | null>;
    findManyByUserId(userId: string): Promise<Checkin[]>;
    countByUserId(userId: string): Promise<number>;
    findById(id: string): Promise<Checkin | null>;
}