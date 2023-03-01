import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDTO } from 'src/dto/create-user.dto';
import { LoginDTO } from 'src/dto/login.dto';
import { User } from 'src/interfaces/user.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel('user') private readonly userModel: Model<User>) {
     this.addDefaultUser()
  }
  
  async create(UserDTO: CreateUserDTO) {
    const { username } = UserDTO;
    const user = await this.userModel.findOne({ username });
    if (user) {
      throw new HttpException('user already exists', HttpStatus.BAD_REQUEST);
    }
    const createdUser = new this.userModel(UserDTO);
    await createdUser.save();
    return this.sanitizeUser(createdUser);
  }

  sanitizeUser(user: User) {
    const sanitized = user.toObject();
    delete sanitized['password'];
    return sanitized;
  }

 
  async findByLogin(UserDTO: LoginDTO) {
    const { username, password } = UserDTO;
    const user = await this.userModel.findOne({ username });
    const hash = await bcrypt.hash(user.password, 10);
    if (!user) {
      throw new HttpException('user doesnt exists', HttpStatus.BAD_REQUEST);
    }
    if (await bcrypt.compare(password, hash)) {
      return this.sanitizeUser(user)
    } else {
      throw new HttpException('invalid credential', HttpStatus.BAD_REQUEST);
    }
  }

  async findByPayload(payload: LoginDTO) {
    const { username } = payload;
    return await this.userModel.findOne({ username });
  }

  async addDefaultUser() {
    const users = await this.userModel.find().exec();
    if (users.length === 0) {
      this.create({
        username: 'admin',
        password: 'default',
        roles: ['Admin']
      });
    }
  }
}

