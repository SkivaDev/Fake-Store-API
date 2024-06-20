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
    @IsEnum(['admin', 'user'])
    @IsOptional()
    role?: string;

    @IsString()
    @IsUrl({protocols: ['http', 'https']})
    @Matches(/(https?:\/\/.*\.(?:png|jpg))/, { message: 'Invalid image url'})
    @IsOptional()
    avatar?: string;
}
