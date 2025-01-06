import { GymRepository } from "@/repositories/gym-repository";
import { Gym } from "@prisma/client";

interface FetchNearbyGymsUseCaseInput {
    userLatitude: number;
    userLongitude: number;
}

interface FetchNearbyGymsUseCaseOutput {
    gyms: Gym[];
}

export class FetchNearbyGymsUseCase {

    constructor(private gymRepository: GymRepository) { }

    async execute({ userLatitude, userLongitude }: FetchNearbyGymsUseCaseInput): Promise<FetchNearbyGymsUseCaseOutput> {

        const gyms = await this.gymRepository.findManyNearby({ latitude: userLatitude, longitude: userLongitude });
        return { gyms };
    }

}