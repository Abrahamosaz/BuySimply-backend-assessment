import { DataSource } from 'typeorm';
import { UserSeeder } from './user.seeder';

export class MainSeeder {
  constructor(private readonly dataSource: DataSource) {}

  async run(): Promise<void> {
    try {
      // Run seeders in order
      await new UserSeeder(this.dataSource).run();
    } catch (error) {
      throw error;
    }
  }
}
