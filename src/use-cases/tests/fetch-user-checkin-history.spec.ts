import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { CheckinUseCase } from '../check-in';
import { InMemoryCheckinRepository } from '@/repositories/in-memory/in-memory-checkin-repository';
import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gym-repository';
import { MaxCheckinNumberError } from '../errors/max-checkin-number';
import { MaxDistanceError } from '../errors/max-distance-error';
import { FetchUserChekinHistoryUseCase } from '../fetch-user-chekin-history';

describe('Checkin Use Case', () => {

    let checkinRepository: InMemoryCheckinRepository;
    let sut: FetchUserChekinHistoryUseCase;

    beforeEach(async () => {
        checkinRepository = new InMemoryCheckinRepository();
        sut = new FetchUserChekinHistoryUseCase(checkinRepository);
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
