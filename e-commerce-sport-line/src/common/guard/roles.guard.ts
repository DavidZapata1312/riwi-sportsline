import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!requiredRoles) return true;

    // Obtener headers para simular el "usuario"
    const request = context.switchToHttp().getRequest<{
      user?: { id: number; role?: string };
      headers: { role?: string };
    }>();

    // Simulación: el rol viene por headers
    const simulatedRole = request.headers.role;

    // Simular creación del usuario (solo para semana 4)
    const user = { id: 1, role: simulatedRole };
    request.user = user;

    // Validación realista
    if (!user.role) {
      throw new ForbiddenException('Role not provided (use header role)');
    }

    const isAllowed = requiredRoles.includes(user.role);

    if (!isAllowed) {
      throw new ForbiddenException('You do not have permission');
    }

    return true;
  }
}
