import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HistoryService } from './reservation.service';
import { History } from './entity/history.entity';
import { Concert } from '../concert/entities/concert.entity';
import { User } from '../user/user.entity';

const mockHistoryRepository = {
  save: jest.fn(),
  find: jest.fn(),
  countBy: jest.fn(),
};

describe('HistoryService', () => {
  let service: HistoryService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HistoryService,
        {
          provide: getRepositoryToken(History),
          useValue: mockHistoryRepository,
        },
      ],
    }).compile();

    service = module.get<HistoryService>(HistoryService);
  });

  // ─── createNewHistory ──────────────────────────────────────────────────────

  describe('createNewHistory', () => {
    it('should create and return a history record', async () => {
      const mockConcert = { id: 1, name: 'Concert A' } as Concert;
      const mockUser = { id: 1, username: 'john' } as User;
      const dto = { action: 'Reserve', user: mockUser, concert: mockConcert };

      const savedHistory = { id: 1, ...dto };
      mockHistoryRepository.save.mockResolvedValue(savedHistory);

      const result = await service.createNewHistory(dto);

      expect(mockHistoryRepository.save).toHaveBeenCalled();
      expect(result).toEqual(savedHistory);
    });
  });

  // ─── findAll ───────────────────────────────────────────────────────────────

  describe('findAll', () => {
    const mockHistory = [
      {
        id: 1,
        action: 'Reserve',
        createAt: new Date('2024-01-01T00:00:00.000Z'),
        user: { id: 1, username: 'john' },
        concert: { id: 1, name: 'Concert A' },
      },
      {
        id: 2,
        action: 'Cancel',
        createAt: new Date('2024-01-02T00:00:00.000Z'),
        user: { id: 2, username: 'jane' },
        concert: { id: 2, name: 'Concert B' },
      },
    ];

    it('should return all history when no userId provided', async () => {
      mockHistoryRepository.find.mockResolvedValue(mockHistory);

      const result = await service.findAll();

      expect(mockHistoryRepository.find).toHaveBeenCalledWith({
        where: {},
        order: { id: 'DESC' },
        relations: ['user', 'concert'],
      });
      expect(result).toEqual([
        {
          dateTime: '2024-01-01T00:00:00.000Z',
          username: 'john',
          concertName: 'Concert A',
          action: 'Reserve',
        },
        {
          dateTime: '2024-01-02T00:00:00.000Z',
          username: 'jane',
          concertName: 'Concert B',
          action: 'Cancel',
        },
      ]);
    });

    it('should filter by userId when provided', async () => {
      mockHistoryRepository.find.mockResolvedValue([mockHistory[0]]);

      const result = await service.findAll('1');

      expect(mockHistoryRepository.find).toHaveBeenCalledWith({
        where: { user: { id: 1 } },
        order: { id: 'DESC' },
        relations: ['user', 'concert'],
      });
      expect(result).toHaveLength(1);
      expect(result[0].username).toBe('john');
    });

    it('should return empty array when no history found', async () => {
      mockHistoryRepository.find.mockResolvedValue([]);

      const result = await service.findAll('99');

      expect(result).toEqual([]);
    });
  });

  // ─── getCountCancelHistory ─────────────────────────────────────────────────

  describe('getCountCancelHistory', () => {
    it('should return count of cancel history', async () => {
      mockHistoryRepository.countBy.mockResolvedValue(5);

      const result = await service.getCountCancelHistory();

      expect(mockHistoryRepository.countBy).toHaveBeenCalledWith({
        action: 'Cancel',
      });
      expect(result).toBe(5);
    });

    it('should return 0 when no cancel history', async () => {
      mockHistoryRepository.countBy.mockResolvedValue(0);

      const result = await service.getCountCancelHistory();

      expect(result).toBe(0);
    });
  });
});
