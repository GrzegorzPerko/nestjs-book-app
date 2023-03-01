
import { Controller, Get, Res, HttpStatus, Param, NotFoundException, Post, Body, Query, Put, Delete, UseGuards } from '@nestjs/common';
import { BookService } from './books.service';
import { CreateBookDTO } from '../dto/create-book.dto';
import { ValidateObjectId } from '../shared/pipes/validate-object-id.pipes';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';


@UseGuards(JwtAuthGuard)
@Controller('books')
export class BooksController {

    constructor(private bookService: BookService) { }

    @Get('/')
    async getBooks(@Res() res) {
        const books = await this.bookService.getBooks();
        return res.status(HttpStatus.OK).json(books);
    }

    @Get('/:bookID')
    async getBook(@Res() res, @Param('bookID', new ValidateObjectId()) postID) {
        const book = await this.bookService.getBook(postID);
        if (!book) throw new NotFoundException('Sorry book no avaiable!');
        return res.status(HttpStatus.OK).json(book);

    }

    @Post('/book')
    async addBook(@Res() res, @Body() createPostDTO: CreateBookDTO) {
        const newBook = await this.bookService.addBook(createPostDTO);
        return res.status(HttpStatus.OK).json({
            message: "Book has add!",
            post: newBook
        })
    }
    @Put('/edit')
    async editBook(
        @Res() res,
        @Query('bookID', new ValidateObjectId()) postID,
        @Body() createPostDTO: CreateBookDTO
    ) {
        const editedBook = await this.bookService.editBook(postID, createPostDTO);
        if (!editedBook) throw new NotFoundException('Book does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'Book has been successfully updated',
            post: editedBook
        })
    }


    @Delete('/delete')
    async deleteBook(@Res() res, @Query('bookID', new ValidateObjectId()) postID) {
        const deletedBook = await this.bookService.deleteBook(postID);
        if (!deletedBook) throw new NotFoundException('Book does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'Post has been deleted!',
            post: deletedBook
        })
    }
}