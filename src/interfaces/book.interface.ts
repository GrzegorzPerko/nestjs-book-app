import { Document } from 'mongoose';
import { Author } from './author.interface';

export interface Book extends Document {
    readonly title: string;
    readonly genre: string;
    readonly author: Author;
    readonly date_public: string;
}