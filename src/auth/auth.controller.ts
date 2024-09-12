import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Request } from 'express';
import { User } from '@prisma/client';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Payload } from './models/payload.model';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService, // el readonly es para que no se pueda modificar el valor de la variable
        private readonly usersService: UsersService,
    ) {}


    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Req() req: Request) {
        const user = req.user as User;

        return {
            access_token: this.authService.generateAccessToken(user),
            refresh_token: this.authService.generateRefreshToken(user)
        };
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    profile(@Req() req: Request) {
        const user = req.user as Payload;

        return this.usersService.findOne(user?.id);
    }

}
