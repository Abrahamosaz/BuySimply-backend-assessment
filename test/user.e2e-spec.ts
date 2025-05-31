import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';

describe('User Endpoints (e2e)', () => {
  let app: INestApplication;
  let createdUserId: string;
  let userAuthCookie: string[];
  let adminAuthCookie: string[];
  let configService: ConfigService;

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

  it('POST /user - should create a new user', async () => {
    const createDto = {
      email: 'abrahamosazee2@gmail.com',
      firstName: 'Abraham',
      lastName: 'Osazee',
      password: 'Password123!',
    };

    const res = await request(app.getHttpServer())
      .post('/user')
      .set('x-api-key', configService.get<string>('API_KEY'))
      .set('Cookie', adminAuthCookie)
      .send(createDto)
      .expect(201);

    console.log('response ', res.body);
    expect(res.body.data).toHaveProperty('id');
    expect(res.body.data.email).toBe(createDto.email);
    createdUserId = res.body.data.id;
  });

  it('GET /user - should return paginated users', async () => {
    const res = await request(app.getHttpServer())
      .get('/user?page=1&limit=10')
      .set('x-api-key', configService.get<string>('API_KEY'))
      .set('Cookie', adminAuthCookie)
      .expect(200);

    expect(res.body.data).toHaveProperty('users');
    expect(Array.isArray(res.body.data.users)).toBe(true);
    expect(res.body.data).toHaveProperty('pagination');
  });

  it('GET /user/:id - should return a single user', async () => {
    const res = await request(app.getHttpServer())
      .get(`/user/${createdUserId}`)
      .set('x-api-key', configService.get<string>('API_KEY'))
      .set('Cookie', userAuthCookie)
      .expect(200);

    expect(res.body.data).toHaveProperty('id', createdUserId);
  });

  it('DELETE /user/:id - should delete the created user', async () => {
    if (createdUserId) {
      await request(app.getHttpServer())
        .delete(`/user/${createdUserId}`)
        .set('x-api-key', configService.get<string>('API_KEY'))
        .set('Cookie', adminAuthCookie)
        .expect(200);
    }
  });
});
