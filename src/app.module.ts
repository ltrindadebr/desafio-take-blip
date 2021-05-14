import { Module } from '@nestjs/common';
import { AppController } from './modules/takeBlip/app.controller';
import { AppService } from './modules/takeBlip/app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
