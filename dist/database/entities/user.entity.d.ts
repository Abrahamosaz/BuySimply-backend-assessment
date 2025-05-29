import { Task } from './task.entity';
export declare enum UserRole {
    ADMIN = "admin",
    USER = "user"
}
export declare class User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    password: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    tasks: Task[];
}
