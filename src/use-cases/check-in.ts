import { CheckinRepository } from "@/repositories/check-in-repository";
import { GymRepository } from "@/repositories/gym-repository";
import { Checkin } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface CheckinUseCaseInput {
    userId: string;
    gymId: string;
    userLatitude: number,
    userLongitude: number
}

interface CheckinUseCaseOutput {
    checkin: Checkin
}

export class CheckinUseCase {

    constructor(private checkinRepository: CheckinRepository, private gymRepository: GymRepository) { }

    async execute({ userId, gymId }: CheckinUseCaseInput): Promise<CheckinUseCaseOutput> {

        const gym = await this.gymRepository.findById(gymId);

        if (!gym) {
            throw new ResourceNotFoundError();
        }

        const checkinOnSameDay = await this.checkinRepository.findByUserIdOnDate(userId, new Date());

        if (checkinOnSameDay) {
            throw new Error();
        }

        const checkin = await this.checkinRepository.create({ gym_id: gymId, user_id: userId });


        return { checkin };
    }

}