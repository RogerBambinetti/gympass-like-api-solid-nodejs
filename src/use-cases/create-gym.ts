import { GymRepository } from "@/repositories/gym-repository";
import { Gym } from "@prisma/client";

interface CreateGymUseCaseInput {
    title: string;
    description: string | null;
    phone: string;
    latitude: number;
    longitude: number;
}

interface CreateGymUseCaseOutput {
    gym: Gym
}

export class CreateGymUseCase {

    constructor(private gymRepository: GymRepository) { }

    async execute({ title, description, phone, latitude, longitude }: CreateGymUseCaseInput): Promise<CreateGymUseCaseOutput> {

        const gym = await this.gymRepository.create({
            title,
            description,
            phone,
            latitude,
            longitude
        });

        return { gym };
    }

}