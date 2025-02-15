import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gym-repository';
import { SearchGymsUseCase } from '@/use-cases/search-gyms';

describe('Search Gyms Use Case', () => {

    let gymRepository: InMemoryGymRepository;
    let sut: SearchGymsUseCase;

    beforeEach(async () => {
        gymRepository = new InMemoryGymRepository()
        sut = new SearchGymsUseCase(gymRepository);
    });

    it('Should be able to search gyms', async () => {
        await gymRepository.create({ title: 'gym 1', description: 'teste', latitude: 0, longitude: 0, phone: '123456789' });
        await gymRepository.create({ title: 'gym 2', description: 'teste', latitude: 0, longitude: 0, phone: '123456789' });

        const { gyms } = await sut.execute({ query: 'gym' });

        expect(gyms).toHaveLength(2);
    });

});
