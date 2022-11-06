import { LocalAuthGuard } from './guards/local-auth.guard';
import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registration')
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Body() user: any) {
    // console.log(process.env.PRIVATE_KEY);
    return this.authService.login({ phoneNumber: user.phoneNumber });
  }
}
