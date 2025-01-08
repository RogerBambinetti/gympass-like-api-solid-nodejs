import { PrismaCheckinRepository } from '@/repositories/prisma/prisma-checkin-repository';
import { GetUserMetricsUseCase } from '@/use-cases/get-user-metrics'

export function makeGetUserMetricsUseCase() {

    const checkinRepository = new PrismaCheckinRepository();

    const authenticateUseCase = new GetUserMetricsUseCase(checkinRepository);

    return authenticateUseCase;
}