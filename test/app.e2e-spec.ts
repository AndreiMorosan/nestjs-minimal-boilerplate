import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { faker } from '@faker-js/faker';
import { AppModule } from './../src/app.module';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { DataSource } from 'typeorm';

describe('Auth e2e', () => {
  let app: INestApplication;

  let userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
  };

  beforeAll(async () => {
    initializeTransactionalContext();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const dataSource = moduleFixture.get<DataSource>(DataSource);
    await dataSource.runMigrations();
  }, 10000);

  afterAll(async () => {
    if (app) {
      const dataSource = app.get(DataSource);
      await dataSource.destroy();
      await app.close();
    }
  }, 10000);

  it('/auth/register (POST)', async () => {
    userData = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password({ length: 8 }),
      phone: faker.phone.number(),
    };

    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .field('firstName', userData.firstName)
      .field('lastName', userData.lastName)
      .field('email', userData.email)
      .field('password', userData.password)
      .field('phone', userData.phone)
      .attach('avatar', '');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('email', userData.email);
  }, 10000);

  it('/auth/login (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: userData.email,
        password: userData.password,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  }, 10000);
});
