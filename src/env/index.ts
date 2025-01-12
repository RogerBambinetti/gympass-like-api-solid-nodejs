import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
    NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
    PORT: z.coerce.number().default(3333),
    JWT_SECRET: z.string().default('secret')
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
    console.error('Error parsing env variables', _env.error);
    throw new Error('Invalid enverionment variables');
}

export const env = _env.data;