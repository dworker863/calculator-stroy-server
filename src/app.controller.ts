import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(JwtAuthGuard)
  @Get('test')
  test(): string {
    return 'test';
  }
}
