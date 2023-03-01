import { Document, Date } from 'mongoose';

export interface Author extends Document {
    readonly name: string;
    readonly surname: string;
    readonly publishment: number;
    readonly date_of_birth: Date;
    readonly date_of_death: Date;
}