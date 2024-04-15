import { Router } from 'express';
import { verifyToken } from '../utils/token-manager.js'
import {validate, chatValidator} from '../utils/validators.js'
import { generateOpenAiChat, sendChatsToUser, deleteChats } from '../controllers/chat-controllers.js'

const chatRoutes = Router();

chatRoutes.post("/new", validate(chatValidator), verifyToken, generateOpenAiChat)

chatRoutes.get("/all-chats", verifyToken, sendChatsToUser)

chatRoutes.delete("/delete", verifyToken, deleteChats)

export default chatRoutes;