import { configureOpenAi } from '../config/openai-config.js';
import { Request, Response, NextFunction } from 'express';
import User from '../models/users.js';
import { ChatCompletionRequestMessage, OpenAIApi } from 'openai';

export const generateOpenAiChat = async (req: Request, res: Response, next: NextFunction) => {
    const { message } = req.body;
    try {
        // Validate request body
        if (!message) {
            return res.status(400).json({ message: "Message is required" });
        }

        // Authenticate user
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).json({ message: "User not registered or token malfunctioned" });
        }

        // Prepare chat messages
        const chats: ChatCompletionRequestMessage[] = user.chats.map(({ role, content }) => ({
            role: role as ChatCompletionRequestMessageRoleEnum,
            content: content as string
        }));
        chats.push({ role: 'user', content: message });
        user.chats.push({ role: 'user', content: message });
        // Create OpenAI instance
        const config = configureOpenAi();
        const openai = new OpenAIApi(config);

        // Generate chat completion
        const chatResponse = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: chats,
        });

        // Update user chats
        user.chats.push(chatResponse.data.choices[0].message);
        await user.save();

        return res.status(200).json({ chats: user.chats});
    } catch (error) {
        console.error("Error in generating chat:", error);
        return res.status(500).json({ message: "Something went wrong", error: error.message });
    }
};

export const sendChatsToUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("Couldnt find the user")
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Couldnt find the user")
        }
        console.log(user.chats)
        return res.status(200).json({ chats: user.chats });
    }
    catch (error) {
        console.error("Error in generating chat:", error);
        return res.status(500).json({ message: "Something went wrong", error: error.message });
    }
}

export const deleteChats = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("Can't Find the User")
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't match");
        }
        user.chats = [];
        await user.save();
        return res.status(200).json({message: "OK"})
    }
    catch (error) {
        console.error("Error in generating chat:", error);
        return res.status(500).json({ message: "Something went wrong", error: error.message });
    }
}