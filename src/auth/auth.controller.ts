import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService, // el readonly es para que no se pueda modificar el valor de la variable
    ) {}


    @Post('login')
    login() {
        return this.authService.login();
    }

    // @Post('register')
    // register() {
    //     return this.authService.register();
    // }

}
