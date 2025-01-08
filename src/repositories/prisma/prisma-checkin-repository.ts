import { prisma } from "@/lib/prisma";
import { Checkin, Prisma } from "@prisma/client";
import { CheckinRepository } from "@/repositories/check-in-repository";

export class PrismaCheckinRepository implements CheckinRepository {
    async create(data: Prisma.CheckinUncheckedCreateInput) {

        const checkin = await prisma.checkin.create({
            data
        });

        return checkin;
    }

    async save(data: Checkin) {
        const checkin = await prisma.checkin.create({
            data
        });

        return checkin;
    }

    async findByUserIdOnDate(userId: string, date: Date) {

        const checkin = await prisma.checkin.findFirst({
            where: {
                user_id: userId,
                created_at: {
                    equals: date
                }
            }
        });

        return checkin;
    }

    async findManyByUserId(userId: string) {
        const checkins = await prisma.checkin.findMany({
            where: {
                user_id: userId
            }
        });

        return checkins;
    }

    async countByUserId(userId: string) {
        const count = await prisma.checkin.count({
            where: {
                user_id: userId
            }
        });

        return count;
    }

    findById(id: string) {
        return prisma.checkin.findUnique({
            where: {
                id
            }
        });
    }
}