import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository, DeepPartial } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';

describe('ProductService', () => {
  let service: ProductService;
  let repo: jest.Mocked<Repository<Product>>;

  beforeEach(async () => {
    const mockRepo = {
      create: jest.fn(),
      save: jest.fn(),
      findOneBy: jest.fn(),
      find: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductService, { provide: getRepositoryToken(Product), useValue: mockRepo }],
    }).compile();

    service = module.get<ProductService>(ProductService);
    repo = module.get(getRepositoryToken(Product));
  });

  it('debería crear un producto correctamente', async () => {
    const dto: CreateProductDto = { name: 'Balón', price: 50, stock: 10 };
    const mockProduct: Product = { id: 1, ...dto } as Product;

    repo.create.mockReturnValue(mockProduct);
    repo.save.mockResolvedValue(mockProduct);

    const result = await service.create(dto);

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(repo.create).toHaveBeenCalledWith(dto);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(repo.save).toHaveBeenCalledWith(mockProduct);
    expect(result).toEqual(mockProduct);
  });

  it('debería retornar un producto por id', async () => {
    const mockProduct: DeepPartial<Product> = { id: 1, name: 'Balón' };
    repo.findOneBy.mockResolvedValue(mockProduct as Product);

    const result = await service.findOne(1);

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(repo.findOneBy).toHaveBeenCalledWith({ id: 1 });
    expect(result).toEqual(mockProduct);
  });

  it('debería retornar todos los productos', async () => {
    const mockProducts: DeepPartial<Product>[] = [
      { id: 1, name: 'Balón' },
      { id: 2, name: 'Zapatillas' },
    ];

    repo.find.mockResolvedValue(mockProducts as Product[]);

    const result = await service.findAll();

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(repo.find).toHaveBeenCalled();
    expect(result).toEqual(mockProducts);
  });
});
