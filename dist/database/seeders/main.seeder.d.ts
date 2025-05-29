import { DataSource } from 'typeorm';
export declare class MainSeeder {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    run(): Promise<void>;
}
