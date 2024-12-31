import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { CheckinRepository } from "@/repositories/check-in-repository";

export class PrismaCheckinRepository implements CheckinRepository {
    async create(data: Prisma.CheckinUncheckedCreateInput) {

        const checkin = await prisma.checkin.create({
            data
        });

        return checkin;
    }
}