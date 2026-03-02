/* eslint-disable prettier/prettier */
import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
    UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "../decorators/roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) return true;

    const request = context.switchToHttp().getRequest<any>();

    if (!request.user) {
      throw new UnauthorizedException("You need to be signed in");
    }

    const { roles } = request.user;
    const hasRole = requiredRoles.some((r) => roles?.includes(r));

    if (!hasRole) {
      throw new ForbiddenException("You do not have access to this resource");
    }

    return true;
  }
}
