// src/modules/auth/auth.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create.user.dto';

@Controller('users')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/register')
    async register(
        @Body() createUserDto: CreateUserDto,
    ): Promise<{ message: string }> {
        return this.authService.register(createUserDto);
    }

    @Post('/login')
    async login(
        @Body() { email, password }: { email: string; password: string },
    ): Promise<{ accessToken: string }> {
        return this.authService.login(email, password);
    }
}
