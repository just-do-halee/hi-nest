import { Controller, Get } from '@nestjs/common';

@Controller('')
export class AppController {
  @Get()
  getHome(): string {
    return `welcome to my home.`;
  }
}
