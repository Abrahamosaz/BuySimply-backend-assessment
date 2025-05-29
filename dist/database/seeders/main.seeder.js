"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainSeeder = void 0;
const user_seeder_1 = require("./user.seeder");
class MainSeeder {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async run() {
        try {
            await new user_seeder_1.UserSeeder(this.dataSource).run();
        }
        catch (error) {
            throw error;
        }
    }
}
exports.MainSeeder = MainSeeder;
//# sourceMappingURL=main.seeder.js.map