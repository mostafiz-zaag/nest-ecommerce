import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty({ message: 'name can not be empty' })
    @Length(2, 255, {
        message: 'name length must be between 2 to 255 char long',
    })
    name: string;

    @IsEmail({}, { message: 'Use valid email' })
    email: string;

    @IsNotEmpty({ message: 'Password can not be empty ' })
    @Length(6, 50, {
        message: 'Password length must be at least 6 to 50 characters long',
    })
    password: string;
}
