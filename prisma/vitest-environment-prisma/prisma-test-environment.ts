import { PrismaClient } from '@prisma/client';
import 'dotenv/config';
import { execSync } from 'node:child_process';

import { randomUUID } from 'node:crypto';
import { Environment } from 'vitest/environments';

const prisma = new PrismaClient();

function generateDatabaseUrl(schema: string) {
    if (!process.env.DATABASE_URL) {
        throw new Error("DATABASE_URL is not set");
    }

    const url = new URL(process.env.DATABASE_URL);

    url.searchParams.set('schema', schema);

    return url.toString();
}

export default <Environment>{
    name: 'prisma',
    transformMode: 'web',
    async setup(global, options) {

        console.log('Setting up Prisma environment');

        const schema = randomUUID();
        const databaseURL = generateDatabaseUrl(schema);

        process.env.DATABASE_URL = databaseURL;

        execSync('npx prisma migrate deploy');

        return {
            async teardown() {
                await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`);
                await prisma.$disconnect();
            }
        }
    }
}