import { describe, it, expect, test } from 'vitest';
import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository';
import { RegisterUseCase } from './register';
import { compare } from 'bcryptjs';
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';

describe('Register Use Case', () => {

    it('Should be able to register', async () => {
        const inMemoryUserRepository = new InMemoryUserRepository();
        const registerUseCase = new RegisterUseCase(inMemoryUserRepository);

        const { user } = await registerUseCase.execute({ name: 'John Doe', email: 'johndoe@gmail.com', password: '123456' });

        expect(user.id).toEqual(expect.any(String));
    });

    it('Should hash user password', async () => {
        const inMemoryUserRepository = new InMemoryUserRepository();
        const registerUseCase = new RegisterUseCase(inMemoryUserRepository);

        const password = '123456';
        const { user } = await registerUseCase.execute({ name: 'John Doe', email: 'johndoe@gmail.com', password })

        const isPasswordHashed = await compare(password, user.password_hash);

        expect(isPasswordHashed).toBe(true);
    });

    it('Should not create user with same email twice', async () => {
        const inMemoryUserRepository = new InMemoryUserRepository();
        const registerUseCase = new RegisterUseCase(inMemoryUserRepository);

        const email = 'johndoe@gmail.com';
        await registerUseCase.execute({ name: 'John Doe', email, password: '123456' });

        expect(() =>
            registerUseCase.execute({ name: 'John Doe', email, password: '123456' })
        ).rejects.toBeInstanceOf(UserAlreadyExistsError);

    });
});
