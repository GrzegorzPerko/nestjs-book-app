
import { Controller, Get, Res, HttpStatus, Param, NotFoundException, Post, Body, Query, Put, Delete, UseGuards } from '@nestjs/common';
import { AuthorService } from './authors.service';
import { CreateAuthorDTO } from '../dto/create-author.dto';
import { ValidateObjectId } from '../shared/pipes/validate-object-id.pipes';
import { AuthenticatedGuard } from 'src/auth/guards/authenticated.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';


@UseGuards(JwtAuthGuard)
@Controller('authors')
export class AuthorsController {

    constructor(private authorService: AuthorService) { }

    @Get('authors')
    async getAuthors(@Res() res) {
        const authors = await this.authorService.getAuthors();
        return res.status(HttpStatus.OK).json(authors);
    }

    @Get('author/:authorId')
    async getAuthor(@Res() res, @Param('bookID', new ValidateObjectId()) postID) {
        const author = await this.authorService.getAuthor(postID);
        if (!author) throw new NotFoundException('Sorry author no avaiable!');
        return res.status(HttpStatus.OK).json(author);

    }

    @Post('/author')
    async addAuthor(@Res() res, @Body() createPostDTO: CreateAuthorDTO) {
        const newAuthor = await this.authorService.addAuthor(createPostDTO);
        return res.status(HttpStatus.OK).json({
            message: "Author has add!",
            post: newAuthor
        })
    }
    @Put('/author/edit')
    async editAuthor(
        @Res() res,
        @Query('bookID', new ValidateObjectId()) postID,
        @Body() createPostDTO: CreateAuthorDTO
    ) {
        const editedAuthor = await this.authorService.editAuthor(postID, createPostDTO);
        if (!editedAuthor) throw new NotFoundException('Book does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'Author has been successfully updated',
            post: editedAuthor
        })
    }


    @Delete('/author/delete')
    async deleteAuthor(@Res() res, @Query('bookID', new ValidateObjectId()) postID) {
        const deletedAuthor = await this.authorService.deleteAuthor(postID);
        if (!deletedAuthor) throw new NotFoundException('Book does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'Post has been deleted!',
            post: deletedAuthor
        })
    }
}