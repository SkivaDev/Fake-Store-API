import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, IsUrl, Matches, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @MinLength(3)
    name: string;

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @MinLength(6)
    password: string;

    @IsString()
    @IsEnum(['admin', 'user'], { message: 'Invalid role, it must be an admin or an user' })
    role: string;

    @IsString()
    @IsUrl({protocols: ['http', 'https']})
    @Matches(/(https?:\/\/.*\.(?:png|jpg|jpeg))/, { message: 'It must be a valid url and have a valid image extension (png, jpg, jpeg)'})
    @IsOptional()
    avatar?: string;
}
