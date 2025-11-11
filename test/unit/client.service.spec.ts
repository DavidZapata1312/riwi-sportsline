import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientService } from '../../src/client/client.service';
import { Client } from '../../src/client/entities/client.entity';
import {NotFoundException} from "@nestjs/common";


describe('ClientService', () => {
    let service: ClientService;
    let repo: jest.Mocked<Repository<Client>>;

    const mockClient: Client = {
        id: 1,
        name: 'Cliente Demo',
        email: 'demo@client.com',
        phone: '123456789',
        createdAt: new Date(),
        updatedAt: new Date(),
    } as any; // 'as any' para ignorar métodos de clase

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ClientService,
                {
                    provide: getRepositoryToken(Client),
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

        service = module.get<ClientService>(ClientService);
        repo = module.get(getRepositoryToken(Client));
    });

    it('debería estar definido', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        it('debería crear un cliente', async () => {
            repo.create.mockReturnValue(mockClient);
            repo.save.mockResolvedValue(mockClient);

            const result = await service.create({
                name: 'Cliente Demo',
                email: 'demo@client.com',
                phone: '123456789',
            });

            expect(repo.create).toHaveBeenCalledWith({
                name: 'Cliente Demo',
                email: 'demo@client.com',
                phone: '123456789',
            });
            expect(repo.save).toHaveBeenCalledWith(mockClient);
            expect(result).toEqual(mockClient);
        });
    });

    describe('findAll', () => {
        it('debería retornar todos los clientes', async () => {
            repo.find.mockResolvedValue([mockClient]);
            const result = await service.findAll();
            expect(result).toEqual([mockClient]);
        });
    });

    describe('findOne', () => {
        it('debería retornar un cliente existente', async () => {
            repo.findOne.mockResolvedValue(mockClient);
            const result = await service.findOne(1);
            expect(repo.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
            expect(result).toEqual(mockClient);
        });

        it('debería lanzar NotFoundException si no existe', async () => {
            repo.findOne.mockResolvedValue(null);
            await expect(service.findOne(99)).rejects.toThrow(NotFoundException);
        });
    });

    describe('update', () => {
        it('debería actualizar un cliente existente', async () => {
            repo.findOne.mockResolvedValue(mockClient);
            repo.save.mockResolvedValue({ ...mockClient, name: 'Cliente Actualizado' });

            const result = await service.update(1, { name: 'Cliente Actualizado' });
            expect(repo.save).toHaveBeenCalled();
            expect(result.name).toBe('Cliente Actualizado');
        });
    });

    describe('remove', () => {
        it('debería eliminar un cliente existente', async () => {
            repo.findOne.mockResolvedValue(mockClient);
            repo.remove.mockResolvedValue(mockClient);

            const result = await service.remove(1);
            expect(repo.remove).toHaveBeenCalledWith(mockClient);
            expect(result).toEqual(mockClient);
        });
    });
});
