import { AuthService } from './../auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'phoneNumber' });
  }

  async validate(phoneNumber: string, password: string): Promise<any> {
    const user = await this.authService.validate(phoneNumber, password);
    console.log(user);

    if (!user) {
      console.log(1);

      throw new UnauthorizedException('Неверные имя пользователя или пароль');
    }

    return user;
  }
}
