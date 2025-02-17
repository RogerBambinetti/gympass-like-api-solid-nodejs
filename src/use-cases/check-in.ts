import { CheckinRepository } from "@/repositories/check-in-repository";
import { GymRepository } from "@/repositories/gym-repository";
import { Checkin } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";
import { MaxDistanceError } from "./errors/max-distance-error";
import { MaxCheckinNumberError } from "./errors/max-checkin-number";

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

    async execute({ userId, gymId, userLatitude, userLongitude }: CheckinUseCaseInput): Promise<CheckinUseCaseOutput> {

        const gym = await this.gymRepository.findById(gymId);

        if (!gym) {
            throw new ResourceNotFoundError();
        }

        const distance = getDistanceBetweenCoordinates({ latitude: userLatitude, longitude: userLongitude }, { latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() });

        const MAX_KM_DISTANCE = 0.1;

        if (distance > MAX_KM_DISTANCE) {
            throw new MaxDistanceError();
        }

        const checkinOnSameDay = await this.checkinRepository.findByUserIdOnDate(userId, new Date());

        if (checkinOnSameDay) {
            throw new MaxCheckinNumberError();
        }

        const checkin = await this.checkinRepository.create({ gym_id: gymId, user_id: userId });


        return { checkin };
    }

}