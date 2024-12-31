import { CheckinRepository } from "@/repositories/checkin-repository";
import { Checkin, Prisma } from "@prisma/client";
import { randomUUID } from "crypto";

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
}