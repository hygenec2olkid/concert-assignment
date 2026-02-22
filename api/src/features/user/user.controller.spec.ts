import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

const mockUserService = {
  findAll: jest.fn(),
};

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useValue: mockUserService }],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  describe('findAll', () => {
    it('should return a list of users', async () => {
      const mockUsers = [
        { id: 1, username: 'john' },
        { id: 2, username: 'jane' },
      ];
      mockUserService.findAll.mockResolvedValue(mockUsers);

      const result = await controller.findAll();

      expect(mockUserService.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockUsers);
    });

    it('should return empty array when no users', async () => {
      mockUserService.findAll.mockResolvedValue([]);

      const result = await controller.findAll();

      expect(mockUserService.findAll).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });
});
