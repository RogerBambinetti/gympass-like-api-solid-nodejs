import { PrismaCheckinRepository } from '@/repositories/prisma/prisma-checkin-repository';
import { FetchUserCheckinHistoryUseCase } from '@/use-cases/fetch-user-checkin-history'

export function makeFetchUserCheckinHistoryUseCase() {

    const gymRepository = new PrismaCheckinRepository();

    const authenticateUseCase = new FetchUserCheckinHistoryUseCase(gymRepository);

    return authenticateUseCase;
}