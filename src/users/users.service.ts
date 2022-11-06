import { CreateUserDto } from './dto/create-user.dto';
import { User } from './models/users.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { IUser } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async create(dto: CreateUserDto): Promise<IUser> {
    const user = await this.userModel.create(dto);
    return user;
  }

  async getUserByPhone(phoneNumber): Promise<IUser> {
    const user = await this.userModel.findOne({ where: { phoneNumber } });
    return user;
  }
}
