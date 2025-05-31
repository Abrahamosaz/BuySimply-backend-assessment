import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { Priority } from '../src/database/typeorm/entities/task.entity';

describe('Task Endpoints (e2e)', () => {
  let app: INestApplication;
  let createdTaskId: string;
  let userAuthCookie: string[];
  let adminAuthCookie: string[];
  let configService: ConfigService;
  let userId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    configService = moduleFixture.get<ConfigService>(ConfigService);

    app.use(cookieParser());

    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
    );
    await app.init();

    //Admin login details
    const adminLoginDto = {
      email: 'admin@example.com',
      password: 'admin123',
    };

    const adminLoginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .set('x-api-key', configService.get<string>('API_KEY'))
      .send(adminLoginDto)
      .expect(200);

    adminAuthCookie = adminLoginResponse.headers[
      'set-cookie'
    ] as unknown as string[];

    //User login details
    const userLoginDto = {
      email: 'user@example.com',
      password: 'user123',
    };

    const userLoginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .set('x-api-key', configService.get<string>('API_KEY'))
      .send(userLoginDto)
      .expect(200);

    userId = userLoginResponse.body.data.id;
    // Store the cookie for subsequent requests
    userAuthCookie = userLoginResponse.headers[
      'set-cookie'
    ] as unknown as string[];
  });

  afterAll(async () => {
    // Logout both users before closing
    await request(app.getHttpServer())
      .post('/auth/logout')
      .set('x-api-key', configService.get<string>('API_KEY'))
      .set('Cookie', adminAuthCookie)
      .expect(200);

    await request(app.getHttpServer())
      .post('/auth/logout')
      .set('x-api-key', configService.get<string>('API_KEY'))
      .set('Cookie', userAuthCookie)
      .expect(200);

    await app.close();
  });

  it('POST /tasks - should create a new task', async () => {
    const createDto = {
      title: 'Test Task',
      description: 'Test Description',
      priority: Priority.LOW,
      dueDate: new Date().toISOString(),
    };

    const res = await request(app.getHttpServer())
      .post('/tasks')
      .set('x-api-key', configService.get<string>('API_KEY'))
      .set('Cookie', userAuthCookie)
      .send(createDto)
      .expect(201);

    expect(res.body.data).toHaveProperty('id');
    expect(res.body.data.title).toBe(createDto.title);
    createdTaskId = res.body.data.id;
  });

  it('GET /tasks - should return paginated tasks', async () => {
    const res = await request(app.getHttpServer())
      .get('/tasks?page=1&limit=10')
      .set('x-api-key', configService.get<string>('API_KEY'))
      .set('Cookie', userAuthCookie)
      .expect(200);

    expect(res.body.data).toHaveProperty('tasks');
    expect(Array.isArray(res.body.data.tasks)).toBe(true);
    expect(res.body.data).toHaveProperty('pagination');
  });

  it('GET /tasks/:id - should return a single task', async () => {
    const res = await request(app.getHttpServer())
      .get(`/tasks/${createdTaskId}`)
      .set('x-api-key', configService.get<string>('API_KEY'))
      .set('Cookie', userAuthCookie)
      .expect(200);

    expect(res.body.data).toHaveProperty('id', createdTaskId);
  });

  it('PATCH /tasks/:id - should update a task', async () => {
    const updateDto = {
      title: 'Updated Task Title',
      priority: Priority.MEDIUM,
    };
    const res = await request(app.getHttpServer())
      .patch(`/tasks/${createdTaskId}`)
      .set('x-api-key', configService.get<string>('API_KEY'))
      .set('Cookie', userAuthCookie)
      .send(updateDto)
      .expect(200);

    expect(res.body.data.title).toBe(updateDto.title);
  });

  it('PATCH /tasks/:id - assign a task to a user', async () => {
    const updateDto = {
      assignedTo: userId,
    };

    const res = await request(app.getHttpServer())
      .patch(`/tasks/${createdTaskId}`)
      .set('x-api-key', configService.get<string>('API_KEY'))
      .set('Cookie', userAuthCookie)
      .send(updateDto)
      .expect(200);

    expect(res.body.data.assignedTo).toBe(userId);
  });

  it('DELETE /tasks/:id - should delete a task', async () => {
    await request(app.getHttpServer())
      .delete(`/tasks/${createdTaskId}`)
      .set('x-api-key', configService.get<string>('API_KEY'))
      .set('Cookie', userAuthCookie)
      .expect(200);
  });

  it('GET /tasks/:id - should return 404 for deleted task', async () => {
    await request(app.getHttpServer())
      .get(`/tasks/${createdTaskId}`)
      .set('x-api-key', configService.get<string>('API_KEY'))
      .set('Cookie', userAuthCookie)
      .expect(404);
  });
});
