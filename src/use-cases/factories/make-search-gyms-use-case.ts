import { PrismaGymRepository } from '@/repositories/prisma/prisma-gym-repository';
import { SearchGymsUseCase } from '@/use-cases/search-gyms'

export function makeSearchGymUseCase() {

    const gymRepository = new PrismaGymRepository();
    const registerUseCase = new SearchGymsUseCase(gymRepository);

    return registerUseCase;
}