const userModel = require('../models/userModel')
const { v4: uuidv4 } = require('uuid');

const createNotification = async (sender, receiver, type, message) =>{
    try{

        const avatar = await userModel.findOne({username: sender.toLowerCase()}).select('avatar')
        const newNotification = {
            sender: sender,
            avatar: avatar,
            type: type,
            receiver: receiver,
            message: message,
            status: 'unread',
            id: uuidv4()
        }

        const verify = await userModel.findOne({
            'notifications.notifications': {
                $elemMatch: {
                sender: sender,
                type: type,
                receiver: receiver,
                }
            }
        }).select('notifications');
      
        if (verify) {
            return res.status(400).json("Notificarea există deja!");
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
            return ({ error: 'Acest utilizator nu exista!' });
        }
    }catch(error){
        console.error(error.message);
        return (error.message);
    }
}

const markAllAsRead = async (req, res) =>{
    try{
        const { username } = req.body;

        const user = await userModel.findOneAndUpdate({username: username.toLowerCase()}, {$set: {'notifications.unread': 0}}, {new:true}).select('notifications');
        

        for(let i = 0; i < user.notifications.notifications.length; i++){
            user.notifications.notifications[i].status = 'read';
            console.log(user.notifications.notifications[i]);
        }
        console.log(user);
        if(!user){
            return res.status(404).json({ error: 'Acest utilizator nu exista!' });
        }

        await userModel.updateOne({username: username.toLowerCase()}, {$set: {'notifications.notifications': user.notifications.notifications}},{new:true}).select('notifications');

        res.status(200).json(user);
    }catch(error){
        console.error(error.message);
        return res.status(404).json(error.message);
    }
}

const markOneAsRead = async (req, res) =>{
    try{
        const {username, id} = req.body;

        const user = await userModel.findOneAndUpdate({username: username.toLowerCase(), 'notifications.notifications.id': id}, 
        {$set: {'notifications.notifications.$.status': 'read'}, $inc: { 'notifications.unread': -1 }}, {new: true}).select('notifications')

        if(!user)
            return res.status(404).json("Acest utilizator nu exista!");

        console.log(user);
        res.status(200).json(user);
    }catch(error){
        console.error(error.message);
        return res.status(404).json(error.message);
    }
}

module.exports={
    createNotification,
    markAllAsRead,
    markOneAsRead
}