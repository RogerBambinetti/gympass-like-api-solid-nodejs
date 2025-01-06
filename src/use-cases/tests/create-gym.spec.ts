import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gym-repository';
import { CreateGymUseCase } from '../create-gym';

describe('Create Gym Use Case', () => {

    let gymRepository: InMemoryGymRepository;
    let sut: CreateGymUseCase;

    beforeEach(async () => {
        gymRepository = new InMemoryGymRepository()
        sut = new CreateGymUseCase(gymRepository);
    });

    it('Should be able to create gym', async () => {
        const { gym } = await sut.execute({ title: 'gym 1', description: 'teste', latitude: 0, longitude: 0, phone: '123456789' });

        expect(gym.id).toEqual(expect.any(String));
    });

});
