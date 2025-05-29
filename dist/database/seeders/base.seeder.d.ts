import { DataSource } from 'typeorm';
export declare abstract class BaseSeeder {
    protected readonly dataSource: DataSource;
    constructor(dataSource: DataSource);
    abstract run(): Promise<void>;
}
