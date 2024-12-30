import { describe, it, expect, test } from 'vitest';
import { hash } from 'bcryptjs';
import { AuthenticateUseCase } from './authenticate';
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';

describe('Authenticate Use Case', () => {

    it('Should be able to authenticate', async () => {
        const userRepository = new InMemoryUserRepository();
        const sut = new AuthenticateUseCase(userRepository);

        const email = 'johndoe@example.com';
        const password = '123456';

        await userRepository.create({
            name: 'John Doe',
            email,
            password_hash: await hash(password, 6)
        });

        const { user } = await sut.execute({ email, password });

        expect(user.id).toEqual(expect.any(String));
    });

    it('Should not be able to authenticate with wrong email', async () => {
        const userRepository = new InMemoryUserRepository();
        const sut = new AuthenticateUseCase(userRepository);

        const email = 'johndoe@example.com';
        const password = '123456';

        await expect(() => sut.execute({ email, password })).rejects.toBeInstanceOf(InvalidCredentialsError);
    });

    it('Should not be able to authenticate with wrong password', async () => {
        const userRepository = new InMemoryUserRepository();
        const sut = new AuthenticateUseCase(userRepository);

        const email = 'johndoe@example.com';
        const password = '123456';

        await userRepository.create({
            name: 'John Doe',
            email,
            password_hash: await hash(password, 6)
        });

        await expect(() => sut.execute({ email, password: password + 'outro' })).rejects.toBeInstanceOf(InvalidCredentialsError);
    });


});
