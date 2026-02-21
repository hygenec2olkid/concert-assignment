import { Controller, Get } from '@nestjs/common';
import { HistoryService } from './reservation.service';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Get()
  findAll() {
    return this.historyService.findAll();
  }
}
