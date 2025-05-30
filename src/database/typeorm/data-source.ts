import { DataSource, DataSourceOptions } from 'typeorm';
import typeormMigrationConfig from '../../common/config/typeorm-migration.config';

export const dataSourceOptions: DataSourceOptions = {
  ...typeormMigrationConfig,
  type: 'postgres',
  migrations: ['build/database/migrations/*.js'],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
