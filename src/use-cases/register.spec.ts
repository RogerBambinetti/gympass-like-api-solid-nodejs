import { describe, it, expect, test } from 'vitest';
import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository';
import { RegisterUseCase } from './register';
import { compare } from 'bcryptjs';
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository';

describe('Register Use Case', () => {

    test('Should hash user password', async () => {
        const inMemoryUserRepository = new InMemoryUserRepository();
        const registerUseCase = new RegisterUseCase(inMemoryUserRepository);

        const { user } = await registerUseCase.execute({ name: 'John Doe', email: 'johndoe@gmail.com', password: '123456' })

        const isPasswordHashed = await compare('123456', user.password_hash);

        expect(isPasswordHashed).toBe(true);
    });
});
