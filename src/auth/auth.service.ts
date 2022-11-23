import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async registration(
    userDto: CreateUserDto,
  ): Promise<{ phoneNumber: string; username: string }> {
    const userWithPhone = await this.usersService.getUserByPhone(
      userDto.phoneNumber,
    );

    if (userWithPhone) {
      console.log('11111');
      
      throw new HttpException(
        'Пользователь с таким номером телефона уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hash = await bcrypt.hash(userDto.password, 10);
    const { phoneNumber, username } = await this.usersService.create({
      ...userDto,
      password: hash,
    });

    return { phoneNumber, username };
  }

  async validate(phoneNumber: string, password: string) {
    const user = await this.usersService.getUserByPhone(phoneNumber);
    const passwordEquals =
      user && (await bcrypt.compare(password, user.password));

    if (user && passwordEquals) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: any) {
    console.log(user);

    const payload = {
      phoneNumber: user.phoneNumber,
      userId: user.id,
      role: user.role,
    };

    return {
      ...payload,
      username: user.username,
      email: user.email,
      access_token: this.jwtService.sign(payload),
    };
  }
}
