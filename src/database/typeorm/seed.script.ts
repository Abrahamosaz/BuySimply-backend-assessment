import { DataSource } from 'typeorm';

import { MainSeeder } from './seeders/main.seeder';
import typeormConfig from '../../common/config/typeorm.config';

async function seed() {
  const dataSource = new DataSource({
    ...typeormConfig(),
    type: 'postgres',
    synchronize: process.env.NODE_ENV === 'development',
  });

  try {
    await dataSource.initialize();
    const seeder = new MainSeeder(dataSource);
    await seeder.run();

    await dataSource.destroy();
    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error during seeding:', error);
    process.exit(1);
  }
}

seed();
