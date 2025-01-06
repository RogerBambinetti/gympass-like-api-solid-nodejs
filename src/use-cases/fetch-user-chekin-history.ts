import { CheckinRepository } from "@/repositories/check-in-repository";
import { Checkin } from "@prisma/client";

interface FetchUserChekinHistoryUseCaseInput {
    userId: string;
}

interface FetchUserChekinHistoryUseCaseOutput {
    checkins: Checkin[];
}

export class FetchUserChekinHistoryUseCase {

    constructor(private checkinRepository: CheckinRepository) { }

    async execute({ userId }: FetchUserChekinHistoryUseCaseInput): Promise<FetchUserChekinHistoryUseCaseOutput> {

        const checkins = await this.checkinRepository.findManyByUserId(userId);

        return { checkins };
    }

}