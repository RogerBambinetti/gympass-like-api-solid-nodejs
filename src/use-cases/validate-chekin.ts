import { CheckinRepository } from "@/repositories/check-in-repository";
import { Checkin } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import dayjs from "dayjs";
import { LateCheckinValidationError } from "./errors/late-checkin-validation-error";

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

        const checkinMinutesLifetime = dayjs(new Date()).diff(
            checkin.created_at, 'minute'
        );

        if (checkinMinutesLifetime > 20) {
            throw new LateCheckinValidationError();
        }

        checkin.validated_at = new Date();

        await this.checkinRepository.save(checkin);

        return { checkin };
    }

}