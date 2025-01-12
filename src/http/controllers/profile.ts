import { FastifyRequest, FastifyReply } from 'fastify';

import { makeGetUserProfileUseCase } from '@/use-cases/factories/make-get-user-profile-use-case';
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error';

export async function profile(request: FastifyRequest, reply: FastifyReply) {

    try {
        const getUserProfileUseCase = makeGetUserProfileUseCase();

        const { user } = await getUserProfileUseCase.execute({ id: request.user.sub });

        return reply.status(200).send({ user });
    } catch (err) {
        if (err instanceof InvalidCredentialsError) {
            return reply.status(400).send({ message: err.message });
        }

        throw err;
    }

}