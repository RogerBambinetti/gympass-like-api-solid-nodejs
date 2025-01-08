import { prisma } from "@/lib/prisma";
import { Prisma, Gym } from "@prisma/client";
import { FindManyNearby, GymRepository } from "../gym-repository";

export class PrismaGymRepository implements GymRepository {
    create(data: Prisma.GymCreateInput): Promise<Gym> {
        const gym = prisma.gym.create({ data });

        return gym;
    }
    findById(id: string): Promise<Gym | null> {
        const gym = prisma.gym.findUnique({
            where: {
                id
            }
        });

        return gym;
    }
    searchMany(query: string): Promise<Gym[]> {
        const gyms = prisma.gym.findMany({
            where: {
                title: {
                    contains: query
                }
            }
        });

        return gyms;
    }
    findManyNearby(params: FindManyNearby): Promise<Gym[]> {
        throw new Error("Method not implemented.");


    }

}