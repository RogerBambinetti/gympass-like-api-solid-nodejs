import { FindManyNearby, GymRepository } from "@/repositories/gym-repository";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";
import { Gym, Prisma } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { randomUUID } from "crypto";

export class InMemoryGymRepository implements GymRepository {

    public items: Gym[] = [];

    async create(data: Prisma.GymCreateInput) {

        const gym = {
            id: data.id || randomUUID(),
            title: data.title,
            description: data.description || null,
            phone: data.phone || null,
            latitude: new Decimal(data.latitude.toString()),
            longitude: new Decimal(data.longitude.toString())
        };

        this.items.push(gym);

        return gym;
    }

    async searchMany(query: string) {
        return this.items.filter(item => item.title.includes(query));
    }

    async findById(id: string) {
        const gym = this.items.find(item => item.id === id);

        if (!gym) {
            return null;
        }

        return gym;
    }

    async findManyNearby(params: FindManyNearby): Promise<Gym[]> {
        return this.items.filter(item => {
            const distance = getDistanceBetweenCoordinates({ latitude: params.latitude, longitude: params.longitude }, { latitude: item.latitude.toNumber(), longitude: item.longitude.toNumber() });

            return distance < 10;
        });
    }

}