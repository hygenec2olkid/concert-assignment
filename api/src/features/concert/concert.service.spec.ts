import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ConcertService } from './concert.service';
import { Concert } from './entities/concert.entity';
import { Ticket } from './entities/ticket.entity';
import { UserService } from '../user/user.service';
import { HistoryService } from '../history/reservation.service';
import { CreateConcertDto } from './dto/create-concert.dto';
import { User } from '../user/user.entity';
import { History } from '../history/entity/history.entity';

const mockQueryBuilder = {
  update: jest.fn().mockReturnThis(),
  set: jest.fn().mockReturnThis(),
  where: jest.fn().mockReturnThis(),
  andWhere: jest.fn().mockReturnThis(),
  returning: jest.fn().mockReturnThis(),
  execute: jest.fn(),
};

const mockConcertRepository = {
  find: jest.fn(),
  findOneBy: jest.fn(),
  save: jest.fn(),
  remove: jest.fn(),
  sum: jest.fn(),
  createQueryBuilder: jest.fn(() => mockQueryBuilder),
};

const mockTicketRepository = {
  findOne: jest.fn(),
  save: jest.fn(),
  remove: jest.fn(),
  count: jest.fn(),
};

const mockUserService = {
  getUserById: jest.fn(),
};

const mockHistoryService = {
  createNewHistory: jest.fn(),
  getCountCancelHistory: jest.fn(),
};

describe('ConcertService', () => {
  let service: ConcertService;

  beforeEach(async () => {
    jest.clearAllMocks();

    // reset query builder chain
    mockQueryBuilder.update.mockReturnThis();
    mockQueryBuilder.set.mockReturnThis();
    mockQueryBuilder.where.mockReturnThis();
    mockQueryBuilder.andWhere.mockReturnThis();
    mockQueryBuilder.returning.mockReturnThis();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConcertService,
        {
          provide: getRepositoryToken(Concert),
          useValue: mockConcertRepository,
        },
        { provide: getRepositoryToken(Ticket), useValue: mockTicketRepository },
        { provide: UserService, useValue: mockUserService },
        { provide: HistoryService, useValue: mockHistoryService },
      ],
    }).compile();

    service = module.get<ConcertService>(ConcertService);
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
      mockConcertRepository.find.mockResolvedValue(mockConcerts as Concert[]);

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
      expect(mockConcertRepository.find).toHaveBeenCalledWith({
        order: { id: 'ASC' },
      });
    });

    it('should return empty array when no concerts', async () => {
      mockConcertRepository.find.mockResolvedValue([]);
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
      mockConcertRepository.save.mockResolvedValue(savedConcert as Concert);

      const result = await service.createConcert(dto);

      expect(mockConcertRepository.save).toHaveBeenCalled();
      expect(result).toEqual(savedConcert);
    });
  });

  // ─── deleteConcert ─────────────────────────────────────────────────────────

  describe('deleteConcert', () => {
    it('should delete concert and return success message', async () => {
      const mockConcert = { id: 1, name: 'Concert A' } as Concert;
      mockConcertRepository.findOneBy.mockResolvedValue(mockConcert);
      mockConcertRepository.remove.mockResolvedValue(mockConcert);

      const result = await service.deleteConcert(1);

      expect(mockConcertRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(mockConcertRepository.remove).toHaveBeenCalledWith(mockConcert);
      expect(result).toEqual({ message: 'Delete successfully' });
    });

    it('should throw NotFoundException if concert not found', async () => {
      mockConcertRepository.findOneBy.mockResolvedValue(null);

      await expect(service.deleteConcert(999)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  // ─── buyTicket ─────────────────────────────────────────────────────────────

  describe('buyTicket', () => {
    it('should buy a ticket and create history', async () => {
      const mockConcert = { id: 1, available_seat: 4 } as Concert;
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

      mockQueryBuilder.execute.mockResolvedValue({
        affected: 1,
        raw: [mockConcert],
      });
      mockUserService.getUserById.mockResolvedValue(mockUser);
      mockTicketRepository.save.mockResolvedValue(mockTicket);
      mockHistoryService.createNewHistory.mockResolvedValue(mockHistory);

      const result = await service.buyTicket({ concertId: 1, userId: 1 });

      expect(mockTicketRepository.save).toHaveBeenCalled();
      expect(mockHistoryService.createNewHistory).toHaveBeenCalledWith(
        expect.objectContaining({ action: 'Reserve' }),
      );
      expect(result).toEqual({ message: 'Reserve successfully' });
    });

    it('should throw NotFoundException if concert not found', async () => {
      mockQueryBuilder.execute.mockResolvedValue({ affected: 0, raw: [] });
      mockConcertRepository.findOneBy.mockResolvedValue(null);

      await expect(
        service.buyTicket({ concertId: 999, userId: 1 }),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if no available seats', async () => {
      mockQueryBuilder.execute.mockResolvedValue({ affected: 0, raw: [] });
      mockConcertRepository.findOneBy.mockResolvedValue({
        id: 1,
        available_seat: 0,
      } as Concert);

      await expect(
        service.buyTicket({ concertId: 1, userId: 1 }),
      ).rejects.toThrow(BadRequestException);
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
      mockConcertRepository.find.mockResolvedValue(mockConcerts);

      const result = await service.userGetListConcert(1);

      expect(result[0].reservedSeat).toBe(true);
      expect(result[1].reservedSeat).toBe(false);
    });
  });

  // ─── cancelTicket ──────────────────────────────────────────────────────────

  describe('cancelTicket', () => {
    it('should cancel ticket, restore seat and create history', async () => {
      const mockConcert = { id: 1, available_seat: 4 } as Concert;
      const mockUser = { id: 1 } as User;
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

      mockTicketRepository.findOne.mockResolvedValue(mockTicket);
      mockTicketRepository.remove.mockResolvedValue(mockTicket);
      mockConcertRepository.save.mockResolvedValue({
        ...mockConcert,
        available_seat: 5,
      } as Concert);
      mockHistoryService.createNewHistory.mockResolvedValue(mockHistory);

      const result = await service.cancelTicket({ concertId: 1, userId: 1 });

      expect(mockTicketRepository.remove).toHaveBeenCalledWith(mockTicket);
      expect(mockConcertRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({ available_seat: 5 }),
      );
      expect(mockHistoryService.createNewHistory).toHaveBeenCalledWith(
        expect.objectContaining({ action: 'Cancel' }),
      );
      expect(result).toEqual({ message: 'Cancel successfully' });
    });

    it('should throw NotFoundException if ticket not found', async () => {
      mockTicketRepository.findOne.mockResolvedValue(null);

      await expect(
        service.cancelTicket({ concertId: 1, userId: 99 }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  // ─── getSummary ────────────────────────────────────────────────────────────

  describe('getSummary', () => {
    it('should return summary with totalSeat, reserve, and cancel', async () => {
      mockConcertRepository.sum.mockResolvedValue(200);
      mockTicketRepository.count.mockResolvedValue(30);
      mockHistoryService.getCountCancelHistory.mockResolvedValue(5);

      const result = await service.getSummary();

      expect(result).toEqual({ totalSeat: 200, reserve: 30, cancel: 5 });
    });

    it('should return 0 for totalSeat if sum returns null', async () => {
      mockConcertRepository.sum.mockResolvedValue(null);
      mockTicketRepository.count.mockResolvedValue(0);
      mockHistoryService.getCountCancelHistory.mockResolvedValue(0);

      const result = await service.getSummary();

      expect(result.totalSeat).toBe(0);
    });
  });
});
