import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Concert } from './entities/concert.entity';
import { Repository } from 'typeorm';
import { CreateConcertDto } from './dto/create-concert.dto';
import { ConcertDto } from './dto/concert.dto';
import { BuyTicketDto } from './dto/buy-ticket.dto';
import { Ticket } from './entities/ticket.entity';
import { UserService } from '../user/user.service';
import { HistoryService } from '../history/reservation.service';

@Injectable()
export class ConcertService {
  constructor(
    @InjectRepository(Concert)
    private concertRepository: Repository<Concert>,

    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>,

    private readonly historyService: HistoryService,
    private readonly userService: UserService,
  ) {}

  async findAll(): Promise<ConcertDto[]> {
    const concerts = await this.concertRepository.find();

    return concerts.map((concert) => {
      const { name, description, total_seat } = concert;

      return {
        id: concert.id,
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

    return await this.concertRepository.save(concert);
  }

  async deleteConcert(id: number): Promise<{ message: string }> {
    const concert = await this.concertRepository.findOneBy({ id });

    if (!concert) {
      throw new NotFoundException(`Concert with id ${id} not found`);
    }

    await this.concertRepository.remove(concert);

    return { message: 'Delete successfully' };
  }

  async handleReserveConcert(id: number): Promise<Concert> {
    const concert = await this.concertRepository.findOneBy({ id });

    if (!concert) {
      throw new NotFoundException(`Concert with id ${id} not found`);
    }

    const availableSeat = concert.available_seat;

    if (availableSeat <= 0) {
      throw new BadRequestException('No available seats');
    }

    concert.available_seat -= 1;

    return await this.concertRepository.save(concert);
  }

  async buyTicket(req: BuyTicketDto) {
    const { concertId, userId } = req;

    const concert = await this.handleReserveConcert(concertId);

    const user = await this.userService.getUserById(userId);

    const ticket = new Ticket();
    ticket.concert = concert;
    ticket.user = user;

    await this.ticketRepository.save(ticket);

    await this.historyService.createNewHistory({
      concert: concert,
      user: user,
      action: 'RESERVE',
    });

    return { message: 'Reserve successfully' };
  }
}
