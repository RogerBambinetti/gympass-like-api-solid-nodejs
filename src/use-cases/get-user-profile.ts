import { compare } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { UserRepository } from "@/repositories/user-repository";
import { User } from "@prisma/client";

interface AuthenticateUseCaseInput {
    email: string;
    password: string;
}

interface AuthenticateUseCaseOutput {
    user: User
}

export class AuthenticateUseCase {

    constructor(private userRepository: UserRepository) { }

    async execute({ email, password }: AuthenticateUseCaseInput): Promise<AuthenticateUseCaseOutput> {
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new InvalidCredentialsError();
        }

        const doesPasswordMatch = await compare(password, user.password_hash);

        if (!doesPasswordMatch) {
            throw new InvalidCredentialsError();
        }

        return { user };
    }

}