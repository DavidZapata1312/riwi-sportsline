import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeliveryService } from '../../src/delivery/delivery.service';
import { Delivery } from '../../src/delivery/entities/delivery.entity';
import { NotFoundException } from '@nestjs/common';
import { DeliveryStatus } from '../../src/delivery/deliveries.enum';

describe('DeliveryService', () => {
    let service: DeliveryService;
    let repo: jest.Mocked<Repository<Delivery>>;

    const mockDelivery: Delivery = {
        id: 1,
        clientId: 1,
        totalAmount: 150.5,
        notes: 'Entrega urgente',
        status: DeliveryStatus.PENDING,
        userId: 2,
        productIds: [1, 2, 3],
        createdAt: new Date(),
        updatedAt: new Date(),
    } as any; // 'as any' para ignorar métodos de clase

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DeliveryService,
                {
                    provide: getRepositoryToken(Delivery),
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

        service = module.get<DeliveryService>(DeliveryService);
        repo = module.get(getRepositoryToken(Delivery));
    });

    it('debería estar definido', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        it('debería crear una entrega', async () => {
            repo.create.mockReturnValue(mockDelivery);
            repo.save.mockResolvedValue(mockDelivery);

            const result = await service.create({
                clientId: 1,
                totalAmount: 150.5,
                notes: 'Entrega urgente',
                status: DeliveryStatus.PENDING,
                userId: 2,
                productIds: [1, 2, 3],
            });

            expect(repo.create).toHaveBeenCalledWith({
                clientId: 1,
                totalAmount: 150.5,
                notes: 'Entrega urgente',
                status: DeliveryStatus.PENDING,
                userId: 2,
                productIds: [1, 2, 3],
            });
            expect(repo.save).toHaveBeenCalledWith(mockDelivery);
            expect(result).toEqual(mockDelivery);
        });
    });

    describe('findAll', () => {
        it('debería retornar todas las entregas', async () => {
            repo.find.mockResolvedValue([mockDelivery]);
            const result = await service.findAll();
            expect(result).toEqual([mockDelivery]);
        });
    });

    describe('findOne', () => {
        it('debería retornar una entrega existente', async () => {
            repo.findOne.mockResolvedValue(mockDelivery);
            const result = await service.findOne(1);
            expect(repo.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
            expect(result).toEqual(mockDelivery);
        });

        it('debería lanzar NotFoundException si no existe', async () => {
            repo.findOne.mockResolvedValue(null);
            await expect(service.findOne(99)).rejects.toThrow(NotFoundException);
        });
    });

    describe('update', () => {
        it('debería actualizar una entrega existente', async () => {
            repo.findOne.mockResolvedValue(mockDelivery);
            repo.save.mockResolvedValue({ ...mockDelivery, status: DeliveryStatus.DELIVERED });

            const result = await service.update(1, { status: DeliveryStatus.DELIVERED });
            expect(repo.save).toHaveBeenCalled();
            expect(result.status).toBe(DeliveryStatus.DELIVERED);
        });
    });

    describe('remove', () => {
        it('debería eliminar una entrega existente', async () => {
            repo.findOne.mockResolvedValue(mockDelivery);
            repo.remove.mockResolvedValue(mockDelivery);

            const result = await service.remove(1);
            expect(repo.remove).toHaveBeenCalledWith(mockDelivery);
            expect(result).toEqual(mockDelivery);
        });
    });
});
