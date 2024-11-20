import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest<Request>();
        const authHeader = request.headers['authorization'];

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new UnauthorizedException('Invalid token');
        }

        const token = authHeader.split(' ')[1];

        try {
            request.user = this.jwtService.verify(token, {
                secret: 'hello-ecommerce',
            });
            return true;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error: any) {
            throw new UnauthorizedException('Invalid or expired token');
        }
    }
}
