import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers['authorization'];

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new UnauthorizedException('Token not provided');
        }

        const token = authHeader.split(' ')[1];

        try {
            request.user = this.jwtService.verify(token, {
                secret: 'your-secret-key',
            });
            return true;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err: any) {
            throw new UnauthorizedException('Invalid or expired token');
        }
    }
}
