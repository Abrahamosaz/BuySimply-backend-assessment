import { registerAs } from '@nestjs/config';
import { User } from '../../database/typeorm/entities/user.entity';
import { Task } from '../../database/typeorm/entities/task.entity';
import { Event } from '../../database/typeorm/entities/event.entity';

export default registerAs('database', () => ({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USERNAME || 'ab',
  password: process.env.DB_PASSWORD || 'abraham',
  database: process.env.DB_NAME || 'task_management',
  entities: [User, Task, Event],
  synchronize: process.env.NODE_ENV !== 'production',
}));
