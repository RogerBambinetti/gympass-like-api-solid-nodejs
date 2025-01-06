import { CheckinRepository } from "@/repositories/check-in-repository";
import { Checkin } from "@prisma/client";

interface GetUserMetricsUseCaseInput {
    userId: string;
}

interface GetUserMetricsUseCaseOutput {
    checkinCount: number;
}

export class GetUserMetricsUseCase {

    constructor(private checkinRepository: CheckinRepository) { }

    async execute({ userId }: GetUserMetricsUseCaseInput): Promise<GetUserMetricsUseCaseOutput> {

        const checkinCount = await this.checkinRepository.countByUserId(userId);

        return { checkinCount };
    }

}