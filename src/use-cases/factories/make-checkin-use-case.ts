import { PrismaCheckinRepository } from '@/repositories/prisma/prisma-checkin-repository';
import { PrismaGymRepository } from '@/repositories/prisma/prisma-gym-repository';
import { CheckinUseCase } from '@/use-cases/check-in'

export function makeCheckinUseCase() {

    const checkinRepository = new PrismaCheckinRepository();
    const gymRepository = new PrismaGymRepository();

    const authenticateUseCase = new CheckinUseCase(checkinRepository, gymRepository);

    return authenticateUseCase;
}