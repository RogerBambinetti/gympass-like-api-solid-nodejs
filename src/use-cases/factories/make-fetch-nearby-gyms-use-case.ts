import { PrismaGymRepository } from '@/repositories/prisma/prisma-gym-repository';
import { FetchNearbyGymsUseCase } from '@/use-cases/fetch-nearby-gyms'q

export function makeFetchNearbyGymsUseCase() {

    const gymRepository = new PrismaGymRepository();

    const authenticateUseCase = new FetchNearbyGymsUseCase(gymRepository);

    return authenticateUseCase;
}