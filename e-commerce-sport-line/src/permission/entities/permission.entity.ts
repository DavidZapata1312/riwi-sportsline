import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Role } from 'src/user/entities/role.entity';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  // Relación inversa con usuarios
  @ManyToMany(() => User, (user) => user.permissions)
  users: User[];

  // Relación inversa con roles
  @ManyToMany(() => Role, (role) => role.permissions)
  roles: Role[];
}
