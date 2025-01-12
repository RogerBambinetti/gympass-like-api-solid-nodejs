import { FastifyInstance } from "fastify"

import { register } from "@/http/controllers/register"
import { authenticate } from "@/http/controllers/authenticate";
import { profile } from "@/http/controllers/profile";

import { VerifyJWT } from "./middlewares/verify-jwt";

export async function appRoutes(app: FastifyInstance) {
    app.post("/users", register);
    app.post("/sessions", authenticate);

    app.get('/me', { onRequest: [VerifyJWT] }, profile)
}
