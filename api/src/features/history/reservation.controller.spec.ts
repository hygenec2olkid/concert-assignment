import { Test, TestingModule } from '@nestjs/testing';
import { HistoryService } from './reservation.service';
import { HistoryController } from './reservation.controller';

const mockHistoryService = {
  findAll: jest.fn(),
};

describe('HistoryController', () => {
  let controller: HistoryController;
  let historyService: jest.Mocked<typeof mockHistoryService>;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [HistoryController],
      providers: [{ provide: HistoryService, useValue: mockHistoryService }],
    }).compile();

    controller = module.get<HistoryController>(HistoryController);
    historyService = module.get(HistoryService);
  });

  describe('findAll', () => {
    it('should return all history when no userId provided', async () => {
      const mockResult = [
        {
          dateTime: '2024-01-01',
          username: 'john',
          concertName: 'Concert A',
          action: 'Reserve',
        },
      ];
      mockHistoryService.findAll.mockResolvedValue(mockResult);

      const result = await controller.findAll();

      expect(historyService.findAll).toHaveBeenCalledWith(undefined);
      expect(result).toEqual(mockResult);
    });

    it('should return history filtered by userId', async () => {
      const mockResult = [
        {
          dateTime: '2024-01-01',
          username: 'john',
          concertName: 'Concert A',
          action: 'Reserve',
        },
      ];
      mockHistoryService.findAll.mockResolvedValue(mockResult);

      const result = await controller.findAll('1');

      expect(historyService.findAll).toHaveBeenCalledWith('1');
      expect(result).toEqual(mockResult);
    });

    it('should return empty array when no history found', async () => {
      mockHistoryService.findAll.mockResolvedValue([]);

      const result = await controller.findAll('99');

      expect(historyService.findAll).toHaveBeenCalledWith('99');
      expect(result).toEqual([]);
    });
  });
});
