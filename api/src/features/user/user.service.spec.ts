import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

const mockUserRepository = {
  findOneBy: jest.fn(),
  find: jest.fn(),
};

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: getRepositoryToken(User), useValue: mockUserRepository },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  // ─── getUserById ───────────────────────────────────────────────────────────

  describe('getUserById', () => {
    it('should return a user when found', async () => {
      const mockUser = { id: 1, username: 'john' } as User;
      mockUserRepository.findOneBy.mockResolvedValue(mockUser);

      const result = await service.getUserById(1);

      expect(mockUserRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(result).toEqual(mockUser);
    });

    it('should throw NotFoundException when user not found', async () => {
      mockUserRepository.findOneBy.mockResolvedValue(null);

      await expect(service.getUserById(999)).rejects.toThrow(NotFoundException);
      await expect(service.getUserById(999)).rejects.toThrow('User not found');
    });
  });

  // ─── findAll ───────────────────────────────────────────────────────────────

  describe('findAll', () => {
    it('should return a list of users', async () => {
      const mockUsers = [
        { id: 1, username: 'john' },
        { id: 2, username: 'jane' },
      ] as User[];
      mockUserRepository.find.mockResolvedValue(mockUsers);

      const result = await service.findAll();

      expect(mockUserRepository.find).toHaveBeenCalled();
      expect(result).toEqual(mockUsers);
    });

    it('should return empty array when no users', async () => {
      mockUserRepository.find.mockResolvedValue([]);

      const result = await service.findAll();

      expect(result).toEqual([]);
    });
  });
});
