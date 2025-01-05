import { describe, it, expect, beforeEach } from 'vitest';
import { RegisterUseCase } from '../register';
import { compare } from 'bcryptjs';
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository';
import { UserAlreadyExistsError } from '../errors/user-already-exists-error';

describe('Register Use Case', () => {

    let userRepository: InMemoryUserRepository;
    let registerUseCase: RegisterUseCase;

    beforeEach(() => {
        userRepository = new InMemoryUserRepository();
        registerUseCase = new RegisterUseCase(userRepository);
    })

    it('Should be able to register', async () => {

        const { user } = await registerUseCase.execute({ name: 'John Doe', email: 'johndoe@gmail.com', password: '123456' });

        expect(user.id).toEqual(expect.any(String));
    });

    it('Should hash user password', async () => {

        const password = '123456';
        const { user } = await registerUseCase.execute({ name: 'John Doe', email: 'johndoe@gmail.com', password })

        const isPasswordHashed = await compare(password, user.password_hash);

        expect(isPasswordHashed).toBe(true);
    });

    it('Should not create user with same email twice', async () => {

        const email = 'johndoe@gmail.com';
        await registerUseCase.execute({ name: 'John Doe', email, password: '123456' });

        await expect(() =>
            registerUseCase.execute({ name: 'John Doe', email, password: '123456' })
        ).rejects.toBeInstanceOf(UserAlreadyExistsError);

    });
});
