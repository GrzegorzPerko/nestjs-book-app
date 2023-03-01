import { Module } from '@nestjs/common';
import { AuthorService } from './authors.service';
import { AuthorsController } from './authors.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthorSchema } from '../schemas/authors.schemas';
import { model } from 'mongoose';

const AuthorModel = model('Author', AuthorSchema);

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Author', schema: AuthorSchema }])
 ],
  providers: [AuthorService, AuthorModel],
  controllers: [AuthorsController]
})

export class AuthorsModule {}