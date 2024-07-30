const userModel = require('../models/userModel')
const { v4: uuidv4 } = require('uuid');
const openai = require('openai');
const client = new openai.OpenAI({ apiKey: process.env.OPEN_AI_KEY })

const newChatMinaAi = async (req, res) =>{
    try{
        const {prompt, username} = req.body;

        if(!username){
            return res.status(400).json({error: 'Trebuia sa fii logat ca sa comunici cu MinaAi.'});
        }

        const chatId = uuidv4();
        const newChat = []

        newChat.push({
            role:"user",
            content:prompt
        });

        const completion = await client.chat.completions.create({
            messages: newChat,
            model: "gpt-3.5-turbo",
            max_tokens: 1
        })

        newChat.push({
            role:"assistant",
            content: completion.choices[0].message.content
        });

        const intermediateChat = [...newChat];
        intermediateChat.push({role: "user", content: 'Da nume conversatiei, max 20 litere, doar litere, nu spune nimic altceva inafara de titlu'});

        const compl = await client.chat.completions.create({
            messages: intermediateChat,
            model: "gpt-3.5-turbo",
            max_tokens: 50
        })
        
        const finalChat = {
            promptName: compl.choices[0].message.content,
            chatId: chatId,
            prompts: newChat,
            date: new Date().toLocaleDateString('ro-RO')
        }
        await userModel.updateOne({username: username.toLowerCase()}, {$push:{prompts:finalChat}});

        console.log(newChat);
        res.status(200).json({chatId});
    }catch(error){
        console.error(error.message);
        res.status(400).json(error.message);
    }
}

const chatMinaAi = async (req, res) =>{
    try{
        const {prompt, username} = req.body
        const {chatId} = req.params
        if(!username){
            return res.status(400).json({error: 'Trebuia sa fii logat ca sa comunici cu MinaAi.'});
        }

        const promptPushed = {
            role:"user",
            content:prompt
        }
        const user = await userModel.findOneAndUpdate({username: username.toLowerCase(), 'prompts.chatId':chatId}, {
            $push: {'prompts.$.prompts': promptPushed}, 
            $set: { 'prompts.$.date': new Date().toLocaleDateString('ro-RO') }
        }).select('prompts.$');
        if(!user){
            return res.status(400).json({error: 'Acesta conversatie nu exista.'});
        }
        const chatHistory = user.prompts[0].prompts
        chatHistory.push(promptPushed);

        const completion = await client.chat.completions.create({
            messages: chatHistory,
            model: "gpt-3.5-turbo",
            max_tokens: 1
        })

        const newPrompt = {
            role:"assistant",
            content: completion.choices[0].message.content
        }
        await userModel.updateOne({username: username.toLowerCase(), 'prompts.chatId':chatId}, {
            $push: {'prompts.$.prompts': newPrompt}
        }).select('prompts');


        console.log(user);
        res.status(200).json({ message: completion.choices[0].message.content })
    }catch(error){
        console.error(error.message);
        res.status(400).json(error.message);
    }
}

const getPromptsConv = async (req, res) =>{
    try{
        const {username} = req.body;

        if(!username)
            return res.status(400).json({error: 'Trebuia sa fii logat ca sa comunici cu MinaAi.'});

        const {chatId} = req.params;

        const user = await userModel.findOne({username: username.toLowerCase(), 'prompts.chatId':chatId}).select('prompts.$');

        console.log(user);

        res.status(200).json({prompts: user.prompts[0].prompts});
    }catch(error){
        console.error(error.message);
        res.status(400).json(error.message);
    }
}

const getPromptsHistory = async (req, res) =>{
    try{
        const {username} = req.body;

        if(!username)
            return res.status(400).json({error: 'Trebuia sa fii logat ca sa comunici cu MinaAi.'});

        const user = await userModel.findOne({username: username.toLowerCase()}).select('prompts.date prompts.promptName prompts.chatId');

        console.log(user);

        res.status(200).json({prompts: user.prompts});
    }catch(error){
        console.error(error.message);
        res.status(400).json(error.message);
    }
}

module.exports={
    chatMinaAi,
    newChatMinaAi,
    getPromptsConv,
    getPromptsHistory
}