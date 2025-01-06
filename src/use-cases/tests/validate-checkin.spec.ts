import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { ValidateCheckinUseCase } from '../validate-checkin';
import { InMemoryCheckinRepository } from '@/repositories/in-memory/in-memory-checkin-repository';

describe('Checkin Use Case', () => {

    let checkinRepository: InMemoryCheckinRepository;
    let sut: ValidateCheckinUseCase;

    beforeEach(async () => {
        checkinRepository = new InMemoryCheckinRepository();
        sut = new ValidateCheckinUseCase(checkinRepository);
    });

    it('Should be able to validate check in', async () => {
        const initialCheckin = await checkinRepository.create({ gym_id: '1', user_id: '1' });

        const { checkin } = await sut.execute({ checkinId: initialCheckin.id });

        expect(checkin.validated_at).toEqual(expect.any(Date));
    });

});
