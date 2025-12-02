/* eslint-disable */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Permission } from './entities/permission.entity';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    @InjectRepository(Permission)
    private readonly permRepo: Repository<Permission>,
  ) {}

  /**
   * Devuelve todos los permisos efectivos de un usuario:
   * - Permisos directos asignados al usuario
   * - Permisos heredados de sus roles
   */
  async getPermissionsForUser(userId: number): Promise<string[]> {
    const user = await this.userRepo.findOne({
      where: { id: userId },
      relations: ['permissions', 'roles', 'roles.permissions'],
    });

    if (!user) return [];

    // Permisos directos del usuario
    const directPerms = user.permissions.map((p) => p.name);

    // Permisos heredados de roles
    const rolePerms = user.roles.flatMap((r) =>
      r.permissions.map((p) => p.name),
    );

    // Unir y quitar duplicados
    return Array.from(new Set([...directPerms, ...rolePerms]));
  }

  /**
   * Devuelve todos los permisos existentes en el sistema
   * (útil para paneles de administración o auditoría)
   */
  async getAllPermissions(): Promise<string[]> {
    const perms = await this.permRepo.find();
    return perms.map((p) => p.name);
  }
}
