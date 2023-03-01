import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { LoginDTO } from './dto/login.dto';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(private readonly userService: UsersService, private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() UserDTO: LoginDTO) {
    const user = await this.userService.findByLogin(UserDTO);
    const payload = {
      username: user.username,
      _id: user._id
    };
    const token = await this.authService.login(payload as any);
    return { user, token };
  }
}
