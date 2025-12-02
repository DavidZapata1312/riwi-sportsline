import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto /create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  create(dto: CreateUserDto) {
    const user = this.userRepository.create(dto);
    return this.userRepository.save(user);
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  findAll() {
    return this.userRepository.find();
  }

  // ➕ Buscar usuario con contraseña (login)
  async findByEmailWithPassword(email: string) {
    return this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password') // password está select:false en la entidad
      .where('user.email = :email', { email })
      .getOne();
  }

  // ➕ Buscar usuario con hash del refresh token
  async findByIdWithRefreshToken(id: number) {
    return this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.currentHashedRefreshToken') // select:false en entidad
      .where('user.id = :id', { id })
      .getOne();
  }

  // ➕ Guardar hashed refresh token
  async setCurrentRefreshToken(hashedRefreshToken: string, userId: number) {
    await this.userRepository.update(userId, {
      currentHashedRefreshToken: hashedRefreshToken,
    });
  }

  // ➕ Remover refresh token (logout)
  async removeRefreshToken(userId: number) {
    await this.userRepository.update(userId, {
      currentHashedRefreshToken: null,
    });
  }

  findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }
}
