import { HttpModule } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [AppService],
    }).compile();

    service = app.get<AppService>(AppService);
  });

  it('Get Heroku API Information and assert her attributes ', async () => {
    const response = await service.getApiInfos();
    expect(response).toHaveProperty('carroselImage');
    expect(response.firstRepository).toHaveProperty('title');
    expect(response.firstRepository).toHaveProperty('subtitle');
    expect(typeof response.firstRepository.title).toBe('string');
  });
});
