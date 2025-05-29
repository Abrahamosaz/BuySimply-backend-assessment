import { User, UserRole } from '../entities/user.entity';
import { BaseSeeder } from './base.seeder';
import * as bcrypt from 'bcrypt';

export class UserSeeder extends BaseSeeder {
  async run(): Promise<void> {
    const userRepository = this.dataSource.getRepository(User);

    const users = [
      {
        email: 'admin@example.com',
        firstName: 'Admin',
        lastName: 'User',
        role: UserRole.ADMIN,
        password: await bcrypt.hash('admin123', 10),
        isActive: true,
      },
      {
        email: 'user@example.com',
        firstName: 'Regular',
        lastName: 'User',
        role: UserRole.USER,
        password: await bcrypt.hash('user123', 10),
        isActive: true,
      },
    ];

    for (const user of users) {
      const existingUser = await userRepository.findOneBy({
        email: user.email,
      });

      if (!existingUser) {
        await userRepository.save(user);
      }
    }
  }
}
