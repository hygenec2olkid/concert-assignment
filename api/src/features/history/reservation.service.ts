import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNewHistoryDto } from './dto/create-new-history.dto';
import { History } from './entity/history.entity';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(History)
    private historyRepository: Repository<History>,
  ) {}

  async createNewHistory(req: CreateNewHistoryDto): Promise<History> {
    const { action, user, concert } = req;

    const history = new History();
    history.action = action;
    history.user = user;
    history.concert = concert;

    return await this.historyRepository.save(history);
  }
}
