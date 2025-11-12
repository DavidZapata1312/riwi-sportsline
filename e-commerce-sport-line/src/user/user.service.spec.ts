import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { DeepPartial } from 'typeorm';

describe('UserService', () => {
  let service: UserService;
  let repo: jest.Mocked<Repository<User>>;

  beforeEach(async () => {
    const mockRepo = {
      create: jest.fn(),
      save: jest.fn(),
      findOneBy: jest.fn(),
      find: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, { provide: getRepositoryToken(User), useValue: mockRepo }],
    }).compile();

    service = module.get<UserService>(UserService);
    repo = module.get(getRepositoryToken(User));
  });

  it('debería crear un usuario correctamente', async () => {
    const dto: DeepPartial<User> = { name: 'Juan', email: 'juan@test.com' };
    const mockUser: User = { id: 1, name: 'Juan', email: 'juan@test.com' } as User;

    // Mocks tipados correctamente
    repo.create.mockReturnValue(mockUser);
    repo.save.mockResolvedValue(mockUser);

    const result = await service.create(dto as User); // o dto si tu servicio lo acepta así

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(repo.create).toHaveBeenCalledWith(dto);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(repo.save).toHaveBeenCalledWith(mockUser);
    expect(result).toEqual(mockUser);
  });

  it('debería retornar un usuario por id', async () => {
    const mockUser = { id: 1, name: 'Juan' } as User;
    repo.findOneBy.mockResolvedValue(mockUser);

    const result = await service.findOne(1);

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(repo.findOneBy).toHaveBeenCalledWith({ id: 1 });
    expect(result).toEqual(mockUser);
  });

  it('debería retornar todos los usuarios', async () => {
    const mockUsers: User[] = [{ id: 1, name: 'Juan' } as User, { id: 2, name: 'Ana' } as User];
    repo.find.mockResolvedValue(mockUsers);

    const result = await service.findAll();

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(repo.find).toHaveBeenCalled();
    expect(result).toEqual(mockUsers);
  });
});
