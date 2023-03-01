import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from "express-session"
import * as passport from "passport"
import * as dotenv from 'dotenv';
const path = require('path');

async function bootstrap() {
 dotenv.config();
 const app = await NestFactory.create(AppModule);
 app.use(
   session({
     secret: "keyboard",
     resave: false,
     saveUninitialized: false,
   })
 )
 app.use(passport.initialize())
 app.use(passport.session())
 app.enableCors();
 await app.listen(3000);
}
bootstrap();