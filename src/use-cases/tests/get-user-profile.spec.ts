import { describe, it, expect, beforeEach } from 'vitest';
import { hash } from 'bcryptjs';
import { GetUserProfileUseCase } from '../get-user-profile';
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

describe('Get User Profile Use Case', () => {

    let userRepository: InMemoryUserRepository;
    let sut: GetUserProfileUseCase;

    beforeEach(() => {
        userRepository = new InMemoryUserRepository();
        sut = new GetUserProfileUseCase(userRepository);
    });

    it('Should be able to get user profile', async () => {

        const email = 'johndoe@example.com';
        const password = '123456';

        const createdUser = await userRepository.create({
            name: 'John Doe',
            email,
            password_hash: await hash(password, 6)
        });

        const { user } = await sut.execute({ id: createdUser.id });

        expect(user.name).toEqual(createdUser.name);
    });

    it('Should not be able to get user profile with wrong id', async () => {

        await expect(() => sut.execute({ id: 'non-existent' })).rejects.toBeInstanceOf(ResourceNotFoundError);
    });


});
