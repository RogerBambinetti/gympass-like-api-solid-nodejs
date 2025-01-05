import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { CheckinUseCase } from './check-in';
import { InMemoryCheckinRepository } from '@/repositories/in-memory/in-memory-checkin-repository';

describe('Checkin Use Case', () => {

    let checkinRepository: InMemoryCheckinRepository;
    let sut: CheckinUseCase;

    beforeEach(() => {
        checkinRepository = new InMemoryCheckinRepository();
        sut = new CheckinUseCase(checkinRepository);

        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('Should be able to check in', async () => {

        const { checkin } = await sut.execute({ gymId: '1', userId: '1' });

        expect(checkin.id).toEqual(expect.any(String));
    });

    it('Should not be able to check in twice in the same day', async () => {
        vi.setSystemTime(new Date('2021-01-01T10:00:00'));

        await sut.execute({ gymId: '1', userId: '1' });

        await expect(() => sut.execute({ gymId: '1', userId: '1' })).rejects.toBeInstanceOf(Error);
    });

    it('Should be able to check in twice in diffent days', async () => {
        vi.setSystemTime(new Date('2021-01-01T10:00:00'));

        await sut.execute({ gymId: '1', userId: '1' });

        vi.setSystemTime(new Date('2021-01-02T10:00:00'));

        const { checkin } = await sut.execute({ gymId: '1', userId: '1' });

        expect(checkin.id).toEqual(expect.any(String));
    });

});
