import { describe, it, expect, beforeEach } from 'vitest';
import { CheckinUseCase } from './check-in';
import { InMemoryCheckinRepository } from '@/repositories/in-memory/in-memory-checkin-repository';

describe('Checkin Use Case', () => {

    let checkinRepository: InMemoryCheckinRepository;
    let sut: CheckinUseCase;

    beforeEach(() => {
        checkinRepository = new InMemoryCheckinRepository();
        sut = new CheckinUseCase(checkinRepository);
    });

    it('Should be able to checkin', async () => {

        const { checkin } = await sut.execute({ gymId: '1', userId: '1' });

        expect(checkin.id).toEqual(expect.any(String));
    });

});
