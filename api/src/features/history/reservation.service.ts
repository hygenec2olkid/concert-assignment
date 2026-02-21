import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNewHistoryDto } from './dto/create-new-history.dto';
import { History } from './entity/history.entity';
import { HistoryDto } from './dto/history.dto';

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

  async findAll(): Promise<HistoryDto[]> {
    const history = await this.historyRepository.find({
      order: {
        id: 'DESC',
      },
      relations: ['user', 'concert'],
    });

    return history.map((h) => {
      const { user, createAt, concert, action } = h;

      return {
        dateTime: createAt.toISOString(),
        username: user.username,
        concertName: concert.name,
        action: action,
      };
    });
  }

  async getCountCancelHistory(): Promise<number> {
    return await this.historyRepository.countBy({ action: 'Cancel' });
  }
}
