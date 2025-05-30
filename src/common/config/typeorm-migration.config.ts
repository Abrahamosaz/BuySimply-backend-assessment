const typeormMigrationConfig = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USERNAME || 'ab',
  password: process.env.DB_PASSWORD || 'abraham',
  database: process.env.DB_NAME || 'task_management',
  entities: [
    'build/database/typeorm/entities/*.entity.js', // For compiled files
  ],
  synchronize: process.env.NODE_ENV !== 'production',
};

export default typeormMigrationConfig;
