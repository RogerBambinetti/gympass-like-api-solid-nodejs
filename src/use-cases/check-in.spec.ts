import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { CheckinUseCase } from './check-in';
import { InMemoryCheckinRepository } from '@/repositories/in-memory/in-memory-checkin-repository';
import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gym-repository';

describe('Checkin Use Case', () => {

    let checkinRepository: InMemoryCheckinRepository;
    let gymRepository: InMemoryGymRepository;
    let sut: CheckinUseCase;

    beforeEach(async () => {
        checkinRepository = new InMemoryCheckinRepository();
        gymRepository = new InMemoryGymRepository()
        sut = new CheckinUseCase(checkinRepository, gymRepository);

        vi.useFakeTimers();

        await gymRepository.create({ id: '1', title: 'Gym 1', latitude: 0, longitude: 0 });
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('Should be able to check in', async () => {
        const { checkin } = await sut.execute({ gymId: '1', userId: '1', userLatitude: 0, userLongitude: 0 });

        expect(checkin.id).toEqual(expect.any(String));
    });

    it('Should not be able to check in twice in the same day', async () => {
        vi.setSystemTime(new Date('2021-01-01T10:00:00'));

        await sut.execute({ gymId: '1', userId: '1', userLatitude: 0, userLongitude: 0 });

        await expect(() => sut.execute({ gymId: '1', userId: '1', userLatitude: 0, userLongitude: 0 })).rejects.toBeInstanceOf(Error);
    });

    it('Should be able to check in twice in diffent days', async () => {
        vi.setSystemTime(new Date('2021-01-01T10:00:00'));

        await sut.execute({ gymId: '1', userId: '1', userLatitude: 0, userLongitude: 0 });

        vi.setSystemTime(new Date('2021-01-02T10:00:00'));

        const { checkin } = await sut.execute({ gymId: '1', userId: '1', userLatitude: 0, userLongitude: 0 });

        expect(checkin.id).toEqual(expect.any(String));
    });

    it('Should not be able to check in on distant gym', async () => {
        await gymRepository.create({ id: '2', title: 'Gym 2', latitude: 0, longitude: 0 });

        await expect(() => sut.execute({ gymId: '2', userId: '1', userLatitude: 500, userLongitude: 500 })).rejects.toBeInstanceOf(Error);
    });

});
