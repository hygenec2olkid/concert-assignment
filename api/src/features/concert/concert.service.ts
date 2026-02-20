import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Concert } from './entities/concert.entity';
import { Repository } from 'typeorm';
import { CreateConcertDto } from './dto/create-concert.dto';

@Injectable()
export class ConcertService {
  constructor(
    @InjectRepository(Concert)
    private concertRepository: Repository<Concert>,
  ) {}

  async findAll(): Promise<Concert[]> {
    return this.concertRepository.find();
  }

  async createConcert(createConcertDto: CreateConcertDto): Promise<Concert> {
    const { concertName, description, totalSeat } = createConcertDto;

    const concert = new Concert();
    concert.name = concertName;
    concert.description = description;
    concert.total_seat = totalSeat;
    concert.available_seat = totalSeat;

    return this.concertRepository.save(concert);
  }
}
