const userModel = require('../models/userModel')
const openai = require('openai');
const client = new openai.OpenAI({ apiKey: process.env.OPEN_AI_KEY })

const chatMinaAi = async (req, res) =>{
    try{
        const {prompt, username} = req.body
        const user = await userModel.findOne({username: username.toLowerCase()}).select('-password -userIp');
        if(!user){
            return res.status(400).json({error: 'Trebuia sa fii logat ca sa comunici cu MinaAi.'});
        }

        const completion = await client.chat.completions.create({
            messages: [{role:"system", content: prompt}],
            model: "gpt-3.5-turbo",
            max_tokens: 5
        })

        res.status(200).json({ message: completion.choices[0].message.content })
    }catch(error){
        console.error(error.message);
        res.status(400).json(error.message);
    }
}

module.exports={
    chatMinaAi    
}