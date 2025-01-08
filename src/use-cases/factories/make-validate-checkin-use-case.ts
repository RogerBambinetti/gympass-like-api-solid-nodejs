import { PrismaCheckinRepository } from '@/repositories/prisma/prisma-checkin-repository';
import { ValidateCheckinUseCase } from '@/use-cases/validate-checkin';

export function makeValidateChekinUseCase() {

    const checkinRepository = new PrismaCheckinRepository();
    const registerUseCase = new ValidateCheckinUseCase(checkinRepository);

    return registerUseCase;
}