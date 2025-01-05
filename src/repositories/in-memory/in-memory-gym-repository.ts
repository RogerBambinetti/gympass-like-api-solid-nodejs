import { GymRepository } from "@/repositories/gym-repository";
import { Gym, Prisma } from "@prisma/client";
import { randomUUID } from "crypto";

export class InMemoryGymRepository implements GymRepository {

    public items: Gym[] = [];

    async create(data: Prisma.GymCreateInput) {

        const gym = {
            id: data.id || randomUUID(),
            title: data.title,
            description: data.description || null,
            phone: data.phone || null,
            latitude: data.latitude as Prisma.Decimal,
            longitude: data.longitude as Prisma.Decimal
        };

        this.items.push(gym);

        return gym;
    }

    async findById(id: string) {
        const gym = this.items.find(item => item.id === id);

        if (!gym) {
            return null;
        }

        return gym;
    }

}