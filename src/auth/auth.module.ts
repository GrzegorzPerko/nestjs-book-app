import { Module } from "@nestjs/common"
import { PassportModule } from "@nestjs/passport"
import { UsersModule } from "src/users/users.module"
import { AuthService } from "./auth.service"
import { JwtModule } from "@nestjs/jwt"
import { JwtStrategy } from "src/auth/strategy/jwt.strategy"
import { ConfigModule } from "@nestjs/config"
@Module({
  imports: [ 
    ConfigModule.forRoot(),
    PassportModule.register({ defaultStrategy: 'jwt',  }),
    JwtModule.register({
      signOptions: { expiresIn: '7d' },
      secret: process.env.SECRET_KEY
    }),
    UsersModule
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
  
})
export class AuthModule {}