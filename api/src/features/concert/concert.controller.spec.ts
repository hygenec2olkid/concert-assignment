import { Test, TestingModule } from '@nestjs/testing';
import { ConcertController } from './concert.controller';
import { ConcertService } from './concert.service';
import { CreateConcertDto } from './dto/create-concert.dto';

const mockConcertService = {
  findAll: jest.fn(),
  userGetListConcert: jest.fn(),
  createConcert: jest.fn(),
  deleteConcert: jest.fn(),
  buyTicket: jest.fn(),
  cancelTicket: jest.fn(),
  getSummary: jest.fn(),
};

describe('ConcertController', () => {
  let controller: ConcertController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConcertController],
      providers: [{ provide: ConcertService, useValue: mockConcertService }],
    }).compile();

    controller = module.get<ConcertController>(ConcertController);
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should call findAll when no userId provided', () => {
      const mockResult = [{ id: 1, name: 'Concert A' }];
      mockConcertService.findAll.mockResolvedValue(mockResult);

      void controller.findAll();

      expect(mockConcertService.findAll).toHaveBeenCalled();
      expect(mockConcertService.userGetListConcert).not.toHaveBeenCalled();
    });

    it('should call userGetListConcert when userId provided', () => {
      const mockResult = [{ id: 1, name: 'Concert A' }];
      mockConcertService.userGetListConcert.mockResolvedValue(mockResult);

      void controller.findAll('1');

      expect(mockConcertService.userGetListConcert).toHaveBeenCalledWith(1);
      expect(mockConcertService.findAll).not.toHaveBeenCalled();
    });
  });

  describe('createConcert', () => {
    it('should call createConcert with correct dto', () => {
      const dto: CreateConcertDto = {
        concertName: 'Mock concert',
        description: 'test',
        totalSeat: 100,
        availableSeat: 100,
      };
      mockConcertService.createConcert.mockResolvedValue({ id: 1, ...dto });

      void controller.createConcert(dto);

      expect(mockConcertService.createConcert).toHaveBeenCalledWith(dto);
    });
  });

  describe('deleteConcert', () => {
    it('should call deleteConcert with correct id', () => {
      mockConcertService.deleteConcert.mockResolvedValue({ success: true });

      void controller.deleteConcert(1);

      expect(mockConcertService.deleteConcert).toHaveBeenCalledWith(1);
    });
  });

  describe('buyTicket', () => {
    it('should call buyTicket with correct dto', () => {
      const dto = { userId: 1, concertId: 1 };
      mockConcertService.buyTicket.mockResolvedValue({ success: true });

      void controller.buyTicket(dto);

      expect(mockConcertService.buyTicket).toHaveBeenCalledWith(dto);
    });
  });

  describe('cancelTicket', () => {
    it('should call cancelTicket with correct dto', () => {
      const dto = { userId: 1, concertId: 1 };
      mockConcertService.cancelTicket.mockResolvedValue({ success: true });

      void controller.cancelTicket(dto);

      expect(mockConcertService.cancelTicket).toHaveBeenCalledWith(dto);
    });
  });

  describe('getSummary', () => {
    it('should call getSummary and return result', () => {
      const mockResult = { totalSeat: 100, reserve: 50, cancel: 10 };
      mockConcertService.getSummary.mockResolvedValue(mockResult);

      void controller.getSummary();

      expect(mockConcertService.getSummary).toHaveBeenCalled();
    });
  });
});
