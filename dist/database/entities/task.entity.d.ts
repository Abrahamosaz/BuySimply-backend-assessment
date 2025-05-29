import { User } from './user.entity';
export declare enum TaskStatus {
    TODO = "todo",
    IN_PROGRESS = "in_progress",
    COMPLETED = "completed"
}
export declare enum Priority {
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high"
}
export declare class Task {
    id: string;
    title: string;
    description: string;
    assignedTo: string;
    status: TaskStatus;
    priority: Priority;
    dueDate: Date;
    completedAt: Date;
    createdAt: Date;
    updatedAt: Date;
    assignedUser: User;
}
