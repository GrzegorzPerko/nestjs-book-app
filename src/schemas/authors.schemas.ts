import * as mongoose from 'mongoose';

export const AuthorSchema = new mongoose.Schema({
    name: String,
    surname: String,
    publishment: String,
    date_of_birth: String,
    date_of_death: String,
})