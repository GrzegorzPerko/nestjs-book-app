import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from '../interfaces/book.interface';
import { CreateBookDTO } from '../dto/create-book.dto';
import { Author } from 'src/interfaces/author.interface';

@Injectable()
export class BookService {

    constructor(@InjectModel('Book') private readonly postModel: Model<Book>) { }

    async getBooks(): Promise<Book[]> {
        const posts = await this.postModel.find().exec();
        posts
        return posts
    }

    async getBook(postID): Promise<Book> {
        const post = await this.postModel
            .findById(postID)
            .exec();
        return post;
    }

    async addBook(createBookDTO: CreateBookDTO): Promise<Book> {
        const newPost = await new this.postModel({
            ...createBookDTO,});
        return newPost.save();
    }

    async editBook(postID, createBookDTO: CreateBookDTO): Promise<Book> {
        const editedPost = await this.postModel
            .findByIdAndUpdate(postID, createBookDTO, { new: true });
        return editedPost;
    }

    async deleteBook(postID): Promise<any> {
        const deletedPost = await this.postModel
            .findByIdAndRemove(postID);
        return deletedPost;
    }

}