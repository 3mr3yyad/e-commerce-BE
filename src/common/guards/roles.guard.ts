
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PUBLIC, Roles } from '../decorators';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const isPublic = this.reflector.get(PUBLIC, context.getHandler());
        if (isPublic) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const roles = this.reflector.get(Roles, context.getHandler());
        if (!roles.includes(user.role)) {
            throw new UnauthorizedException('not allowed');
        }
        return true
    }
}
