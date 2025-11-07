import { DataSource, Repository } from 'typeorm';
import { User, UserRole } from '../user/entities/user.entity';

export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  // 🔹 Buscar usuario por email
  async findByEmail(email: string): Promise<User | null> {
    return this.findOne({ where: { email } });
  }

  // 🔹 Buscar todos los usuarios con rol específico
  async findByRole(role: UserRole): Promise<User[]> {
    return this.find({ where: { role } });
  }

  // 🔹 Crear un nuevo usuario
  async createUser(data: Partial<User>): Promise<User> {
    const newUser = this.create(data);
    return this.save(newUser);
  }

  // 🔹 Actualizar usuario
  async updateUser(id: number, data: Partial<User>): Promise<User | null> {
    await this.update(id, data);
    return this.findOne({ where: { id } });
  }

  // 🔹 Eliminar usuario
  async deleteUser(id: number): Promise<boolean> {
    const result = await this.delete(id);
    return (result.affected ?? 0) > 0;
  }
}
