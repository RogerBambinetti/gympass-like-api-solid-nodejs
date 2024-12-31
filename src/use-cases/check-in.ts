import { CheckinRepository } from "@/repositories/check-in-repository";
import { Checkin } from "@prisma/client";

interface CheckinUseCaseInput {
    userId: string;
    gymId: string;
}

interface CheckinUseCaseOutput {
    checkin: Checkin
}

export class CheckinUseCase {

    constructor(private checkinRepository: CheckinRepository) { }

    async execute({ userId, gymId }: CheckinUseCaseInput): Promise<CheckinUseCaseOutput> {
        const checkin = await this.checkinRepository.create({ gym_id: gymId, user_id: userId });

        return { checkin };
    }

}