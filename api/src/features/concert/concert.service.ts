import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Concert } from './entities/concert.entity';
import { Repository } from 'typeorm';
import { CreateConcertDto } from './dto/request/create-concert.dto';

@Injectable()
export class ConcertService {
  constructor(
    @InjectRepository(Concert)
    private concertRepository: Repository<Concert>,
  ) {}

  async findAll(): Promise<CreateConcertDto[]> {
    const concerts = await this.concertRepository.find();

    return concerts.map((concert) => {
      const { name, description, total_seat } = concert;

      return {
        concertName: name,
        description: description || '',
        totalSeat: total_seat,
        availableSeat: concert.available_seat,
      };
    });
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
