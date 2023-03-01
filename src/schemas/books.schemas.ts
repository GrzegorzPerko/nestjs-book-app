import * as mongoose from 'mongoose';

export const BookSchema = new mongoose.Schema({
    title: String,
    genre: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    },
    date_plubic: String
}, {
    timestamps: true
})