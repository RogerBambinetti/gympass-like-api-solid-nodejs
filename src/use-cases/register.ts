import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error";

interface RegisterUseCaseInput {
    name: string;
    email: string;
    password: string;
}

export class RegisterUseCase {

    constructor(private userRepository: any) { }

    async register({ name, email, password }: RegisterUseCaseInput) {
        const passwordHash = await hash(password, 6);

        const userWithSameEmail = await this.userRepository.findByEmail(email);

        if (userWithSameEmail) {
            throw new UserAlreadyExistsError();
        }

        await this.userRepository.create({
            name,
            email,
            password_hash: passwordHash
        });
    }

}