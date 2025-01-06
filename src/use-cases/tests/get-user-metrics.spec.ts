import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { InMemoryCheckinRepository } from '@/repositories/in-memory/in-memory-checkin-repository';
import { GetUserMetricsUseCase } from '../get-user-metrics';

describe('Get User Metrics Use Case', () => {

    let checkinRepository: InMemoryCheckinRepository;
    let sut: GetUserMetricsUseCase;

    beforeEach(async () => {
        checkinRepository = new InMemoryCheckinRepository();
        sut = new GetUserMetricsUseCase(checkinRepository);
    });

    it('Should be able to get user metricas', async () => {

        const userId = '1';

        await checkinRepository.create({ user_id: userId, gym_id: '1' });
        await checkinRepository.create({ user_id: userId, gym_id: '1' });

        const { checkinCount } = await sut.execute({ userId: userId });

        expect(checkinCount).toBe(2);
    });

});
