const userModel = require('../models/userModel')
const { v4: uuidv4 } = require('uuid');

const createNotification = async (sender, receiver, type) =>{
    try{
        const newNotification = {
            sender: sender,
            type: type,
            receiver: receiver
        }

        const user = await userModel.findOneAndUpdate(
            { username: receiver.toLowerCase() },
            {
                $push: {
                    'notifications.notifications': newNotification
                },
                $inc: { 'notifications.unread': 1 }
            },
            { new: true }
        );

        if(!user){
            return res.status(404).json({ error: 'Acest utilizator nu exista!' });
        }
    }catch(error){
        console.error(error.message);
        return res.status(404).json(error.message);
    }
}

module.exports={
    createNotification
}