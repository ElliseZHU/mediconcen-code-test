import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateRecordDto } from './create-record.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async handleRecord(@Body() createRecordDto: CreateRecordDto) {
    return await this.appService.processRecord(createRecordDto);
  }
}
