import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error";
import { UserRepository } from "@/repositories/user-repository";
import { User } from "@prisma/client";

interface RegisterUseCaseInput {
    name: string;
    email: string;
    password: string;
}

interface RegisterUseCaseOutput {
    user: User
}

export class RegisterUseCase {

    constructor(private userRepository: UserRepository) { }

    async execute({ name, email, password }: RegisterUseCaseInput): Promise<RegisterUseCaseOutput> {
        const passwordHash = await hash(password, 6);

        const userWithSameEmail = await this.userRepository.findByEmail(email);

        if (userWithSameEmail) {
            throw new UserAlreadyExistsError();
        }

        const user = await this.userRepository.create({
            name,
            email,
            password_hash: passwordHash
        });

        return { user };
    }

}