import { Controller, Get, Query } from '@nestjs/common';
import { HistoryService } from './reservation.service';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Get()
  findAll(@Query('userId') userId?: string) {
    return this.historyService.findAll(userId);
  }
}
