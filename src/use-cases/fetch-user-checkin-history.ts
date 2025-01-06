import { CheckinRepository } from "@/repositories/check-in-repository";
import { Checkin } from "@prisma/client";

interface FetchUserCheckinHistoryUseCaseInput {
    userId: string;
}

interface FetchUserCheckinHistoryUseCaseOutput {
    checkins: Checkin[];
}

export class FetchUserCheckinHistoryUseCase {

    constructor(private checkinRepository: CheckinRepository) { }

    async execute({ userId }: FetchUserCheckinHistoryUseCaseInput): Promise<FetchUserCheckinHistoryUseCaseOutput> {

        const checkins = await this.checkinRepository.findManyByUserId(userId);

        return { checkins };
    }

}