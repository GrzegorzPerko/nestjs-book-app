import { Module } from '@nestjs/common';
import { BookService } from './books.service';
import { AuthorsModule } from '../authors/authors.module';
import { BooksController } from './books.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BookSchema } from '../schemas/books.schemas';
import { model } from 'mongoose';

const BookModel = model('Book', BookSchema);

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Book', schema: BookSchema }])
 ],
  providers: [BookService, BookModel],
  controllers: [BooksController],

})
export class BooksModule {}
