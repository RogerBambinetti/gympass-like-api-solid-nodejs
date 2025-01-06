import { CheckinRepository } from "@/repositories/check-in-repository";
import { Checkin, Prisma } from "@prisma/client";
import { randomUUID } from "crypto";
import dayjs from "dayjs";

export class InMemoryCheckinRepository implements CheckinRepository {

    public items: Checkin[] = [];

    async create(data: Prisma.CheckinUncheckedCreateInput) {

        const checkin = {
            id: randomUUID(),
            user_id: data.user_id,
            gym_id: data.gym_id,
            validated_at: data.validated_at ? new Date(data.validated_at) : null,
            created_at: new Date()
        };

        this.items.push(checkin);

        return checkin;
    }

    async save(data: Checkin) {
        const index = this.items.findIndex((checkin) => checkin.id == data.id);
        this.items[index] = data;

        return this.items[index];
    }

    async findManyByUserId(userId: string): Promise<Checkin[]> {
        return this.items.filter((checkin) => checkin.user_id == userId);
    }

    async countByUserId(userId: string): Promise<number> {
        return this.items.filter((checkin) => checkin.user_id == userId).length;
    }

    async findByUserIdOnDate(userId: string, date: Date): Promise<Checkin | null> {
        const startOfTheDay = dayjs(date).startOf('date');
        const endOfTheDay = dayjs(date).endOf('date');

        const checkinOnSameDate = this.items.find((checkin) => {
            const checkinDate = dayjs(checkin.created_at);
            const isOnSameDate = checkinDate.isAfter(startOfTheDay) && checkinDate.isBefore(endOfTheDay);

            return checkin.user_id == userId && isOnSameDate;
        });

        return checkinOnSameDate || null;
    }

    async findById(id: string): Promise<Checkin | null> {
        return this.items.find((checkin) => checkin.id == id) || null;
    }
}