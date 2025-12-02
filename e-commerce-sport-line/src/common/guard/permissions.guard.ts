/* eslint-disable */
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from '../decorators/permissions.decorator';
import { PermissionsService } from '../../permission/permissions.service';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private permissionsService: PermissionsService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('Usuario no autenticado');
    }

    // Si el endpoint no requiere permisos, permitir
    if (!requiredPermissions) {
      return true;
    }

    // Obtener permisos desde BD
    const userPermissions = await this.permissionsService.getPermissionsForUser(
      user.id,
    );

    // ⚡ Ahora el admin pasa porque tiene admin:all en BD
    const hasAll = requiredPermissions.every((p) =>
      userPermissions.includes(p) || userPermissions.includes('admin:all'),
    );

    if (!hasAll) {
      throw new ForbiddenException(
        `No posees los permisos necesarios: ${requiredPermissions.join(', ')}`,
      );
    }

    return true;
  }
}
