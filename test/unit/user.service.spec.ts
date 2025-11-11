import {Test, TestingModule} from '@nestjs/testing';
import {getRepositoryToken} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {UserService} from '../../src/user/user.service';
import {User} from '../../src/user/entities/user.entity';
import {UserType} from "../../src/user/user.enum";

describe('UserService', () => {
    let service: UserService;
    let repo: jest.Mocked<Repository<User>>;

    const mockUser: User = {
        id: 1,
        name: 'David',
        email: 'david@example.com',
        password: 'hashedpassword',
        role: UserType.STAFF,
        deliveries: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        hashPassword: jest.fn().mockResolvedValue(undefined),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: getRepositoryToken(User),
                    useValue: {
                        create: jest.fn(),
                        save: jest.fn(),
                        find: jest.fn(),
                        findOne: jest.fn(),
                        remove: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<UserService>(UserService);
        repo = module.get(getRepositoryToken(User));
    });

    it('debería estar definido', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        it('debería crear un usuario', async () => {
            repo.create.mockReturnValue(mockUser);
            repo.save.mockResolvedValue(mockUser);

            const result = await service.create({
                name: 'David',
                email: 'david@example.com',
                password: '12345',

            });

            expect(repo.create).toHaveBeenCalledWith({
                name: 'David',
                email: 'david@example.com',
                password: '12345',
            });
            expect(repo.save).toHaveBeenCalledWith(mockUser);
            expect(result).toEqual(mockUser);
        });
    });

    describe('remove', () => {
        it('debería eliminar un usuario existente', async () => {
            repo.findOne.mockResolvedValue(mockUser);
            repo.remove.mockResolvedValue(mockUser);

            const result = await service.remove(1);
            expect(repo.remove).toHaveBeenCalledWith(mockUser);
            expect(result).toEqual(mockUser);
        });
    });
});
