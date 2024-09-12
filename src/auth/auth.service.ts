import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { Payload } from './models/payload.model';
import { RefreshTokenDto } from './dto/refreshToken.dto';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findOneByEmail(email);
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }


    async login(loginDto: LoginDto) {

        const { email, password } = loginDto;

        const user = await this.usersService.findOne(email);

        if(!user) {
            throw new Error('User not found');
        }

        if(user.password !== password) {
            throw new Error('Password is incorrect');
        }

        const payload = { email: user.email, sub: user.id };

        return {
            access_token: this.jwtService.sign(payload),
        };

        // return 'Login';
    }

    generateAccessToken(user: User) {
        const payload: Payload = { sub: user.id };

        return this.jwtService.sign(payload, {
            secret: process.env.JWT_SECRET,
            expiresIn: '1d',
        });
    }

    generateRefreshToken(user: User) {
        const payload: Payload = { sub: user.id };

        return this.jwtService.sign(payload, {
            secret: process.env.JWT_SECRET,
            expiresIn: '7d',
        });
    }

    async generateAccessTokenByRefreshToken (refreshTokenDto: RefreshTokenDto) {

        try {
            
            const { refreshToken } = refreshTokenDto;

            const payload = this.jwtService.verify(refreshToken, {
                secret: process.env.JWT_SECRET,
            }) as Payload;

            const user = await this.usersService.findOne(payload.sub);
            const newAccessToken = this.generateAccessToken(user);
            const newRefreshToken = this.generateRefreshToken(user);

            return {
                access_token: newAccessToken,
                refresh_token: newRefreshToken
            }

        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }


 
    }


}
