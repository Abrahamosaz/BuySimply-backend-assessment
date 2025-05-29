"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const user_module_1 = require("./user/user.module");
const task_module_1 = require("./task/task.module");
const database_module_1 = require("./database/database.module");
const config_1 = require("@nestjs/config");
const database_config_1 = require("./database/database.config");
const typeorm_1 = require("@nestjs/typeorm");
const Joi = require("joi");
const jwt_1 = require("@nestjs/jwt");
const event_emitter_1 = require("@nestjs/event-emitter");
const event_module_1 = require("./event/event.module");
const apiKeyMiddleware_1 = require("./middleware/apiKeyMiddleware");
const jwtMiddleware_1 = require("./middleware/jwtMiddleware");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(apiKeyMiddleware_1.ApiKeyMiddleware)
            .forRoutes('*')
            .apply(jwtMiddleware_1.JwtMiddleware)
            .exclude('auth/(.*)')
            .forRoutes('*');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: ['.env', '.env.example'],
                load: [database_config_1.default],
                validationSchema: Joi.object({
                    DB_HOST: Joi.string().required(),
                    DB_PORT: Joi.number().required(),
                    DB_USERNAME: Joi.string().required(),
                    DB_PASSWORD: Joi.string().required(),
                    DB_NAME: Joi.string().required(),
                    JWT_SECRET: Joi.string().required(),
                    JWT_EXPIRES_IN: Joi.string().required(),
                    API_KEY: Joi.string().required(),
                }),
            }),
            jwt_1.JwtModule.register({
                global: true,
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
                    ...configService.get('database'),
                }),
                inject: [config_1.ConfigService],
            }),
            event_emitter_1.EventEmitterModule.forRoot(),
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            task_module_1.TaskModule,
            database_module_1.DatabaseModule,
            event_module_1.EventModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map