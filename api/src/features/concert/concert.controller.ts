import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ConcertService } from './concert.service';
import { CreateConcertDto } from './dto/create-concert.dto';
import { BuyTicketDto } from './dto/buy-ticket.dto';
import { CancelTicketDto } from './dto/cancel-ticket.dto';

@Controller('concert')
export class ConcertController {
  constructor(private readonly concertService: ConcertService) {}

  @Get()
  findAll(@Query('userId') userId?: string) {
    if (userId) {
      return this.concertService.userGetListConcert(Number(userId));
    }
    return this.concertService.findAll();
  }

  @Post()
  createConcert(@Body() req: CreateConcertDto) {
    return this.concertService.createConcert(req);
  }

  @Delete(':id')
  deleteConcert(@Param('id', ParseIntPipe) id: number) {
    return this.concertService.deleteConcert(id);
  }

  @Post('reserve')
  buyTicket(@Body() req: BuyTicketDto) {
    return this.concertService.buyTicket(req);
  }

  @Post('cancel')
  cancelTicket(@Body() req: CancelTicketDto) {
    return this.concertService.cancelTicket(req);
  }

  @Get('summary')
  getSummary() {
    return this.concertService.getSummary();
  }
}
