import { Prisma, User } from '@prisma/client';

export interface UserRepository {
    create(data: Prisma.UserCreateInput): Promise<User>;
    findById(email: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
}