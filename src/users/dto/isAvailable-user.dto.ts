import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class IsAvailableUserDto {
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;
}