"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const database_config_1 = require("./database.config");
const main_seeder_1 = require("./seeders/main.seeder");
async function seed() {
    const dataSource = new typeorm_1.DataSource({
        ...(0, database_config_1.default)(),
        type: 'postgres',
        synchronize: process.env.NODE_ENV === 'development',
    });
    try {
        await dataSource.initialize();
        const seeder = new main_seeder_1.MainSeeder(dataSource);
        await seeder.run();
        await dataSource.destroy();
        console.log('Database seeding completed successfully!');
    }
    catch (error) {
        console.error('Error during seeding:', error);
        process.exit(1);
    }
}
seed();
//# sourceMappingURL=seed.script.js.map