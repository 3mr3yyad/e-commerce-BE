import { UserRepository } from '@/models';
import { CanActivate, ExecutionContext, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PUBLIC } from '../decorators';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly userRepository: UserRepository,
        private readonly reflector: Reflector
    ) { }
    async canActivate(
        context: ExecutionContext): Promise<boolean>  {
        try {
            const isPublic = this.reflector.get(PUBLIC, context.getHandler());
        if (isPublic) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const { authorization } = request.headers;

        const payload = this.jwtService.verify(authorization, {
            secret: this.configService.get('jwt').SECRET_KEY
        });

        const user = await this.userRepository.getOne({ _id: payload._id });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        request.user = user;
        return true;
        } catch (error) {
            throw new UnauthorizedException(error.message);
        }
    }
}
