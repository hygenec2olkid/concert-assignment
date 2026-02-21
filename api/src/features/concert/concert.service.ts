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
    const concerts = await this.concertRepository.find({
      order: {
        id: 'ASC',
      },
    });

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
      action: 'Reserve',
    });

    return { message: 'Reserve successfully' };
  }

  async userGetListConcert(userId: number): Promise<ConcertDto[]> {
    const concerts = await this.concertRepository.find({
      order: {
        id: 'ASC',
      },
      relations: {
        tickets: {
          user: true,
        },
      },
    });

    return concerts.map((concert) => {
      const { name, description, total_seat } = concert;

      return {
        id: concert.id,
        concertName: name,
        description: description || '',
        totalSeat: total_seat,
        availableSeat: concert.available_seat,
        reservedSeat: concert.tickets.some(
          (ticket) => ticket.user.id === userId,
        ),
      };
    });
  }

  async cancelTicket(req: BuyTicketDto) {
    const { concertId, userId } = req;

    const ticket = await this.ticketRepository.findOne({
      where: {
        concert: { id: concertId },
        user: { id: userId },
      },
      relations: ['concert', 'user'],
    });

    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }

    await this.ticketRepository.remove(ticket);

    const concert = ticket.concert;
    concert.available_seat += 1;
    await this.concertRepository.save(concert);

    await this.historyService.createNewHistory({
      concert: concert,
      user: ticket.user,
      action: 'Cancel',
    });

    return { message: 'Cancel successfully' };
  }
}
