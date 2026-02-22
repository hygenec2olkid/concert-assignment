import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ConcertService } from './concert.service';
import { Concert } from './entities/concert.entity';
import { Ticket } from './entities/ticket.entity';
import { UserService } from '../user/user.service';
import { HistoryService } from '../history/reservation.service';
import { CreateConcertDto } from './dto/create-concert.dto';
import { User } from '../user/user.entity';
import { History } from '../history/entity/history.entity';

const mockConcertRepository = () => ({
  find: jest.fn(),
  findOneBy: jest.fn(),
  save: jest.fn(),
  remove: jest.fn(),
  sum: jest.fn(),
});

const mockTicketRepository = () => ({
  findOne: jest.fn(),
  save: jest.fn(),
  remove: jest.fn(),
  count: jest.fn(),
});

const mockUserService = () => ({
  getUserById: jest.fn(),
});

const mockHistoryService = () => ({
  createNewHistory: jest.fn(),
  getCountCancelHistory: jest.fn(),
});

describe('ConcertService', () => {
  let service: ConcertService;
  let concertRepository: jest.Mocked<
    Pick<Repository<Concert>, 'find' | 'findOneBy' | 'save' | 'remove' | 'sum'>
  >;
  let ticketRepository: jest.Mocked<
    Pick<
      Repository<Ticket>,
      'find' | 'findOneBy' | 'save' | 'remove' | 'sum' | 'findOne' | 'count'
    >
  >;
  let userService: jest.Mocked<UserService>;
  let historyService: jest.Mocked<
    Pick<HistoryService, 'createNewHistory' | 'getCountCancelHistory'>
  >;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConcertService,
        {
          provide: getRepositoryToken(Concert),
          useFactory: mockConcertRepository,
        },
        {
          provide: getRepositoryToken(Ticket),
          useFactory: mockTicketRepository,
        },
        { provide: UserService, useFactory: mockUserService },
        { provide: HistoryService, useFactory: mockHistoryService },
      ],
    }).compile();

    service = module.get<ConcertService>(ConcertService);
    concertRepository = module.get(getRepositoryToken(Concert));
    ticketRepository = module.get(getRepositoryToken(Ticket));
    userService = module.get(UserService);
    historyService = module.get(HistoryService);

    //     concertRepository = module.get(getRepositoryToken(Concert)) as jest.Mocked<Repository<Concert>>;
    // ticketRepository = module.get(getRepositoryToken(Ticket)) as jest.Mocked<Repository<Ticket>>;
    // userService = module.get(UserService) as jest.Mocked<UserService>;
    // historyService = module.get(HistoryService) as jest.Mocked<HistoryService>;
  });

  // ─── findAll ───────────────────────────────────────────────────────────────

  describe('findAll', () => {
    it('should return a list of concerts', async () => {
      const mockConcerts = [
        {
          id: 1,
          name: 'Concert A',
          description: 'Desc A',
          total_seat: 100,
          available_seat: 80,
        },
        {
          id: 2,
          name: 'Concert B',
          description: null,
          total_seat: 50,
          available_seat: 50,
        },
      ];
      concertRepository.find.mockResolvedValue(mockConcerts as Concert[]);

      const result = await service.findAll();

      expect(result).toEqual([
        {
          id: 1,
          concertName: 'Concert A',
          description: 'Desc A',
          totalSeat: 100,
          availableSeat: 80,
        },
        {
          id: 2,
          concertName: 'Concert B',
          description: '',
          totalSeat: 50,
          availableSeat: 50,
        },
      ]);
      expect(concertRepository.find).toHaveBeenCalledWith({
        order: { id: 'ASC' },
      });
    });

    it('should return empty array when no concerts', async () => {
      concertRepository.find.mockResolvedValue([]);
      const result = await service.findAll();
      expect(result).toEqual([]);
    });
  });

  // ─── createConcert ─────────────────────────────────────────────────────────

  describe('createConcert', () => {
    it('should create and return a concert', async () => {
      const dto: CreateConcertDto = {
        concertName: 'New Concert',
        description: 'Some desc',
        totalSeat: 100,
        availableSeat: 100,
      };
      const savedConcert = {
        id: 1,
        name: 'New Concert',
        description: 'Some desc',
        total_seat: 100,
        available_seat: 100,
      };
      concertRepository.save.mockResolvedValue(savedConcert as Concert);

      const result = await service.createConcert(dto);

      expect(concertRepository.save).toHaveBeenCalled();
      expect(result).toEqual(savedConcert);
    });
  });

  // ─── deleteConcert ─────────────────────────────────────────────────────────

  describe('deleteConcert', () => {
    it('should delete concert and return success message', async () => {
      const mockConcert = { id: 1, name: 'Concert A' } as Concert;
      concertRepository.findOneBy.mockResolvedValue(mockConcert);
      concertRepository.remove.mockResolvedValue(mockConcert);

      const result = await service.deleteConcert(1);

      expect(concertRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(concertRepository.remove).toHaveBeenCalledWith(mockConcert);
      expect(result).toEqual({ message: 'Delete successfully' });
    });

    it('should throw NotFoundException if concert not found', async () => {
      concertRepository.findOneBy.mockResolvedValue(null);

      await expect(service.deleteConcert(999)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  // ─── handleReserveConcert ──────────────────────────────────────────────────

  describe('handleReserveConcert', () => {
    it('should decrement available_seat and return concert', async () => {
      const mockConcert = { id: 1, available_seat: 5 } as Concert;
      concertRepository.findOneBy.mockResolvedValue(mockConcert);
      concertRepository.save.mockResolvedValue({
        ...mockConcert,
        available_seat: 4,
      } as Concert);

      const result = await service.handleReserveConcert(1);

      expect(result.available_seat).toBe(4);
    });

    it('should throw NotFoundException if concert not found', async () => {
      concertRepository.findOneBy.mockResolvedValue(null);

      await expect(service.handleReserveConcert(999)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw BadRequestException if no available seats', async () => {
      const mockConcert = { id: 1, available_seat: 0 } as Concert;
      concertRepository.findOneBy.mockResolvedValue(mockConcert);

      await expect(service.handleReserveConcert(1)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  // ─── buyTicket ─────────────────────────────────────────────────────────────

  describe('buyTicket', () => {
    it('should buy a ticket and create history', async () => {
      const mockConcert = { id: 1, available_seat: 5 } as Concert;
      const mockUser = { id: 1, username: 'john' } as User;
      const mockTicket = {
        id: 1,
        concert: mockConcert,
        user: mockUser,
      } as Ticket;
      const mockHistory = {
        id: 1,
        action: 'Reserve',
        user: mockUser,
        concert: mockConcert,
      } as History;

      concertRepository.findOneBy.mockResolvedValue(mockConcert);
      concertRepository.save.mockResolvedValue({
        ...mockConcert,
        available_seat: 4,
      } as Concert);
      userService.getUserById.mockResolvedValue(mockUser);
      ticketRepository.save.mockResolvedValue(mockTicket);
      historyService.createNewHistory.mockResolvedValue(mockHistory);

      const result = await service.buyTicket({ concertId: 1, userId: 1 });

      expect(ticketRepository.save).toHaveBeenCalled();
      expect(historyService.createNewHistory).toHaveBeenCalledWith(
        expect.objectContaining({ action: 'Reserve' }),
      );
      expect(result).toEqual({ message: 'Reserve successfully' });
    });

    it('should throw NotFoundException if concert not found', async () => {
      concertRepository.findOneBy.mockResolvedValue(null);

      await expect(
        service.buyTicket({ concertId: 999, userId: 1 }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  // ─── userGetListConcert ────────────────────────────────────────────────────

  describe('userGetListConcert', () => {
    it('should return concerts with reservedSeat flag for user', async () => {
      const mockConcerts = [
        {
          id: 1,
          name: 'Concert A',
          description: 'Desc',
          total_seat: 100,
          available_seat: 98,
          tickets: [{ user: { id: 1 } }, { user: { id: 2 } }],
        },
        {
          id: 2,
          name: 'Concert B',
          description: null,
          total_seat: 50,
          available_seat: 50,
          tickets: [],
        },
      ] as Concert[];
      concertRepository.find.mockResolvedValue(mockConcerts);

      const result = await service.userGetListConcert(1);

      expect(result[0].reservedSeat).toBe(true); // user 1 has ticket
      expect(result[1].reservedSeat).toBe(false); // no tickets
    });
  });

  // ─── cancelTicket ──────────────────────────────────────────────────────────

  describe('cancelTicket', () => {
    it('should cancel ticket, restore seat and create history', async () => {
      const mockConcert = { id: 1, available_seat: 4 } as Concert;
      const mockUser = { id: 1 };
      const mockTicket = {
        id: 1,
        concert: mockConcert,
        user: mockUser,
      } as Ticket;
      const mockHistory = {
        id: 1,
        action: 'Cancel',
        user: mockUser,
        concert: mockConcert,
      } as History;

      ticketRepository.findOne.mockResolvedValue(mockTicket);
      ticketRepository.remove.mockResolvedValue(mockTicket);
      concertRepository.save.mockResolvedValue({
        ...mockConcert,
        available_seat: 5,
      } as Concert);
      historyService.createNewHistory.mockResolvedValue(mockHistory);

      const result = await service.cancelTicket({ concertId: 1, userId: 1 });

      expect(ticketRepository.remove).toHaveBeenCalledWith(mockTicket);
      expect(concertRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({ available_seat: 5 }),
      );
      expect(historyService.createNewHistory).toHaveBeenCalledWith(
        expect.objectContaining({ action: 'Cancel' }),
      );
      expect(result).toEqual({ message: 'Cancel successfully' });
    });

    it('should throw NotFoundException if ticket not found', async () => {
      ticketRepository.findOne.mockResolvedValue(null);

      await expect(
        service.cancelTicket({ concertId: 1, userId: 99 }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  // ─── getSummary ────────────────────────────────────────────────────────────

  describe('getSummary', () => {
    it('should return summary with totalSeat, reserve, and cancel', async () => {
      concertRepository.sum.mockResolvedValue(200);
      ticketRepository.count.mockResolvedValue(30);
      historyService.getCountCancelHistory.mockResolvedValue(5);

      const result = await service.getSummary();

      expect(result).toEqual({ totalSeat: 200, reserve: 30, cancel: 5 });
    });

    it('should return 0 for totalSeat if sum returns null', async () => {
      concertRepository.sum.mockResolvedValue(null);
      ticketRepository.count.mockResolvedValue(0);
      historyService.getCountCancelHistory.mockResolvedValue(0);

      const result = await service.getSummary();

      expect(result.totalSeat).toBe(0);
    });
  });
});
