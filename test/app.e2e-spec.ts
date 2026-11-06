import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('POST / - should generate a new userID for new id1 and id2', async () => {
    const randomId = Math.random().toString();
    const response = await request(app.getHttpServer())
      .post('/')
      .send({ id1: `test1_${randomId}`, id2: `test2_${randomId}` })
      .expect(201);

    expect(response.body).toHaveProperty('userID');
    expect(typeof response.body.userID).toBe('string');
  });

  it('POST / - should return the SAME userID for repeating the same id1 and id2', async () => {
    const id1 = 'REPEAT_TEST_1';
    const id2 = 'REPEAT_TEST_2';

    // 第一次請求
    const res1 = await request(app.getHttpServer())
      .post('/')
      .send({ id1, id2 })
      .expect(201);

    const firstUserId = res1.body.userID;

    // 第二次請求（重複相同組合）
    const res2 = await request(app.getHttpServer())
      .post('/')
      .send({ id1, id2 })
      .expect(201);

    const secondUserId = res2.body.userID;

    // 驗證兩次回傳的 ID 必須完全一致
    expect(secondUserId).toBe(firstUserId);
  });

  it('POST / - should fail validation when parameters are missing', async () => {
    await request(app.getHttpServer())
      .post('/')
      .send({ id1: 'ONLY_ID_1' }) // 缺少 id2
      .expect(400);
  });
});
