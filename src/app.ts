import fastify from "fastify";
import { appRoutes } from "./http/routes";
import { ZodError } from "zod";
import { env } from "@/env";

const app = fastify();

app.register(appRoutes);

app.setErrorHandler((error, request, reply) => {
    if (error instanceof ZodError) {
        return reply.code(400).send({ message: 'Validation error.', issues: error.format });
    }

    if (env.NODE_ENV !== 'production') {
        console.log(error);
    } else {
        // TODO: Log error in a log service (DATADOG/NEWRELIC/SENTRY).
    }

    return reply.code(500).send({ message: 'Internal server error.' });
});

export { app };