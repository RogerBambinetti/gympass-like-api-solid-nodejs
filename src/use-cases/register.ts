import { hash } from "bcryptjs";

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
            throw new Error("Email already in use");
        }

        await this.userRepository.create({
            name,
            email,
            password_hash: passwordHash
        });
    }

}