import { compare } from "bcryptjs";
import { UserRepository } from "@/repositories/user-repository";
import { User } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface GetUserProfileUseCaseInput {
    id: string;
}

interface GetUserProfileUseCaseOutput {
    user: User
}

export class GetUserProfileUseCase {

    constructor(private userRepository: UserRepository) { }

    async execute({ id }: GetUserProfileUseCaseInput): Promise<GetUserProfileUseCaseOutput> {
        const user = await this.userRepository.findById(id);

        if (!user) {
            throw new ResourceNotFoundError();
        }

        return { user };
    }

}