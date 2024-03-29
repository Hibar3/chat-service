import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExternalModule } from './external/external.module';

@Module({
  imports: [ExternalModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
