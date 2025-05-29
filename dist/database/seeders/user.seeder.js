"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSeeder = void 0;
const user_entity_1 = require("../entities/user.entity");
const base_seeder_1 = require("./base.seeder");
const bcrypt = require("bcrypt");
class UserSeeder extends base_seeder_1.BaseSeeder {
    async run() {
        const userRepository = this.dataSource.getRepository(user_entity_1.User);
        const users = [
            {
                email: 'admin@example.com',
                firstName: 'Admin',
                lastName: 'User',
                role: user_entity_1.UserRole.ADMIN,
                password: await bcrypt.hash('admin123', 10),
                isActive: true,
            },
            {
                email: 'user@example.com',
                firstName: 'Regular',
                lastName: 'User',
                role: user_entity_1.UserRole.USER,
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
exports.UserSeeder = UserSeeder;
//# sourceMappingURL=user.seeder.js.map