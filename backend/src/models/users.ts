import mongoose from "mongoose";
import { randomUUID } from 'crypto'

const chatSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
        default: randomUUID()
    },
    role: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    }
})

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    chat:[chatSchema],
})

const User = mongoose.model('User', userSchema);

export default User;