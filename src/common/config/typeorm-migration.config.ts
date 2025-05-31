import { config } from 'dotenv';
config();

const typeormMigrationConfig = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [
    'build/database/typeorm/entities/*.entity.js', // For compiled files
  ],
  synchronize: process.env.NODE_ENV !== 'production',
};

export default typeormMigrationConfig;
