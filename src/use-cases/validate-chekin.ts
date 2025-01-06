import { CheckinRepository } from "@/repositories/check-in-repository";
import { Checkin } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface ValidateCheckinUseCaseInput {
    checkinId: string;
}

interface ValidateCheckinUseCaseOutput {
    checkin: Checkin
}

export class ValidateCheckinUseCase {

    constructor(private checkinRepository: CheckinRepository) { }

    async execute({ checkinId }: ValidateCheckinUseCaseInput): Promise<ValidateCheckinUseCaseOutput> {

        const checkin = await this.checkinRepository.findById(checkinId);

        if (!checkin) {
            throw new ResourceNotFoundError();
        }

        checkin.validated_at = new Date();

        await this.checkinRepository.save(checkin);

        return { checkin };
    }

}