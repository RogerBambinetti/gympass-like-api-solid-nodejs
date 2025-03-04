import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { InMemoryCheckinRepository } from '@/repositories/in-memory/in-memory-checkin-repository';
import { FetchUserCheckinHistoryUseCase } from '@/use-cases/fetch-user-checkin-history';

describe('Fetch User Checkin History Use Case', () => {

    let checkinRepository: InMemoryCheckinRepository;
    let sut: FetchUserCheckinHistoryUseCase;

    beforeEach(async () => {
        checkinRepository = new InMemoryCheckinRepository();
        sut = new FetchUserCheckinHistoryUseCase(checkinRepository);
    });

    it('Should be able to fetch check in history', async () => {

        const userId = '1';

        await checkinRepository.create({ user_id: userId, gym_id: '1' });
        await checkinRepository.create({ user_id: userId, gym_id: '2' });

        const { checkins } = await sut.execute({ userId: userId });

        expect(checkins).toBeInstanceOf(Array);
        expect(checkins).toHaveLength(2);
    });

});
