import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gym-repository';
import { FetchNearbyGymsUseCase } from '../fetch-nearby-gyms';

describe('Fetch Nearby Gyms Use Case', () => {

    let gymRepository: InMemoryGymRepository;
    let sut: FetchNearbyGymsUseCase;

    beforeEach(async () => {
        gymRepository = new InMemoryGymRepository()
        sut = new FetchNearbyGymsUseCase(gymRepository);
    });

    it('Should be able to fetch nearby gyms', async () => {
        await gymRepository.create({ title: 'gym 1', description: 'teste', latitude: 0, longitude: 0, phone: '123456789' });
        await gymRepository.create({ title: 'gym 2', description: 'teste', latitude: 0, longitude: 0, phone: '123456789' });

        const { gyms } = await sut.execute({ userLatitude: 0, userLongitude: 0 });

        expect(gyms).toHaveLength(2);
    });

});
