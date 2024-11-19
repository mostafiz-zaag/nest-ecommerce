import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateCategoryDto {
    @IsNotEmpty({ message: 'name name must not be empty' })
    @IsString({ message: 'name name must be a string' })
    @Length(3, 50, { message: 'Length must be at least 3 to 50 char long' })
    name: string;
}
