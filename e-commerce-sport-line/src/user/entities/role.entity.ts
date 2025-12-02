// role.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { User } from './user.entity';
import { Permission } from 'src/permission/entities/permission.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  // Relación con usuarios
  @ManyToMany(() => User, (user) => user.roles)
  users: User[];

  // Relación con permisos
  @ManyToMany(() => Permission, (permission) => permission.roles)
  permissions: Permission[];
}
