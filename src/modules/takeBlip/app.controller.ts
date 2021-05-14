import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { QueryResponseDto } from './dtos/queryResponse.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getApiInfos(): Promise<QueryResponseDto[]> {
    return this.appService.getApiInfos();
  }
}
