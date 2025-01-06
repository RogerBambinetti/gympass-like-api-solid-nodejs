import { GymRepository } from "@/repositories/gym-repository";
import { Gym } from "@prisma/client";

interface SearchGymsUseCaseInput {
    query: string;
}

interface SearchGymsUseCaseOutput {
    gyms: Gym[];
}

export class SearchGymsUseCase {

    constructor(private gymRepository: GymRepository) { }

    async execute({ query }: SearchGymsUseCaseInput): Promise<SearchGymsUseCaseOutput> {

        const gyms = await this.gymRepository.searchMany(query);
        return { gyms };
    }

}