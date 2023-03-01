import { Injectable, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth/auth.service';

@Injectable()
export class AppService {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
