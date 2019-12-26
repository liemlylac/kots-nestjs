import { Controller, Get, NotFoundException } from '@nestjs/common';

@Controller()
export class AppController {

  @Get()
  notFound() {
    throw new NotFoundException();
  }
}
