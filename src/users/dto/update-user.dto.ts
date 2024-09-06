import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsEnum, IsOptional, IsString, IsUrl, Matches, MinLength } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {

    @IsString()
    @MinLength(3)
    @IsOptional()
    name?: string;

    @IsString()
    @IsEmail()
    @IsOptional()
    email?: string;

    @IsString()
    @MinLength(6)
    @IsOptional()
    password?: string;

    @IsString()
    @IsEnum(['admin', 'user'], { message: 'Invalid role, it must be an admin or an user' })
    @IsOptional()
    role?: string;

    @IsString()
    @IsUrl({protocols: ['http', 'https']})
    @Matches(/(https?:\/\/.*\.(?:png|jpg|jpeg))/, { message: 'It must be a valid url and have a valid image extension (png, jpg, jpeg)'})
    @IsOptional()
    avatar?: string;
}
