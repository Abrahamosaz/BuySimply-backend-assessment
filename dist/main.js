"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: [
            'http://localhost:3000',
            'https://frontend-production-0bfc.up.railway.app',
        ],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        credentials: true,
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Backend Assessment API')
        .setDescription('The BuySimply Backend Task Management System Assessment API')
        .setVersion('1.0')
        .addTag('Task Management System API')
        .addApiKey({
        type: 'apiKey',
        name: 'x-api-key',
        in: 'header',
        description: 'API key for authentication',
    }, 'x-api-key')
        .build();
    const documentFactory = () => swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('swagger/api', app, documentFactory, {
        jsonDocumentUrl: '/swagger/api-json',
    });
    app.setGlobalPrefix('/api');
    const dataSource = app.get(typeorm_1.DataSource);
    if (dataSource.isInitialized) {
        console.log('Database connected successfully!');
        console.log(`Connected to database: ${dataSource.options.database}`);
    }
    else {
        console.log('Database connection failed!');
    }
    const port = process.env.PORT ?? 3000;
    await app.listen(port);
    console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map