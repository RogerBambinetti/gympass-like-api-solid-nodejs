import { FastifyInstance } from "fastify"

import { register } from "@/http/controllers/users/register"
import { authenticate } from "@/http/controllers/users/authenticate";
import { profile } from "@/http/controllers/users/profile";

import { VerifyJWT } from "@/http//middlewares/verify-jwt";

export async function gymRoutes(app: FastifyInstance) {
    app.addHook('onRequest', VerifyJWT);
}
