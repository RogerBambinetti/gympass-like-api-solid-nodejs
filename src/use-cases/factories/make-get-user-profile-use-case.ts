import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository';
import { GetUserProfileUseCase } from '@/use-cases/get-user-profile'

export function makeGetUserProfileUseCase() {

    const userRepository = new PrismaUserRepository();

    const authenticateUseCase = new GetUserProfileUseCase(userRepository);

    return authenticateUseCase;
}