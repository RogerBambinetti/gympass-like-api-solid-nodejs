import { FastifyInstance } from "fastify"

import { register } from "@/http/controllers/users/register"
import { authenticate } from "@/http/controllers/users/authenticate";
import { profile } from "@/http/controllers/users/profile";

import { VerifyJWT } from "@/http//middlewares/verify-jwt";

export async function userRoutes(app: FastifyInstance) {
    app.post("/users", register);
    app.post("/sessions", authenticate);

    app.get('/me', { onRequest: [VerifyJWT] }, profile)
}
