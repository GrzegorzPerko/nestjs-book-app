import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Author } from '../interfaces/author.interface';
import { CreateAuthorDTO } from '../dto/create-author.dto';

@Injectable()
export class AuthorService {

    constructor(@InjectModel('Author') private readonly postModel: Model<Author>) { }

    async getAuthors(): Promise<Author[]> {
        const posts = await this.postModel.find().exec();
        return posts;
    }

    async getAuthor(postID): Promise<Author> {
        const post = await this.postModel
            .findById(postID)
            .exec();
        return post;
    }

    async addAuthor(createAuthorDTO: CreateAuthorDTO): Promise<Author> {
        const newPost = await new this.postModel(createAuthorDTO);
        return newPost.save();
    }

    async editAuthor(postID, createAuthorDTO: CreateAuthorDTO): Promise<Author> {
        const editedPost = await this.postModel
            .findByIdAndUpdate(postID, createAuthorDTO, { new: true });
        return editedPost;
    }

    async deleteAuthor(postID): Promise<any> {
        const deletedPost = await this.postModel
            .findByIdAndRemove(postID);
        return deletedPost;
    }

}