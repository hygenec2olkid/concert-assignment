import { Body, Controller, Get, Post } from '@nestjs/common';
import { ConcertService } from './concert.service';
import { CreateConcertDto } from './dto/request/create-concert.dto';

@Controller('concert')
export class ConcertController {
  constructor(private readonly concertService: ConcertService) {}

  @Get()
  findAll() {
    return this.concertService.findAll();
  }

  @Post()
  createConcert(@Body() createConcertDto: CreateConcertDto) {
    return this.concertService.createConcert(createConcertDto);
  }
}
