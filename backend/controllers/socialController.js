const userModel = require('../models/userModel')
const { v4: uuidv4 } = require('uuid');
const {
    createNotification
} = require('../controllers/notificationController')

const followUser = async (req, res)=>{
    try{
        const {follower, toBeFollowed} = req.body;

        const targetUser = await userModel.findOne({ username: follower.toLowerCase() }).select('following');
        console.log(targetUser);
        if (targetUser.following.some(user => user.username === toBeFollowed.toLowerCase())) {
            return res.status(400).json({ error: 'Deja urmaresti acest utilizator!' });
        }

        const avatarFollower = await userModel.findOne({ username: follower.toLowerCase() }).select('avatar');
        const avatarToBeFollowed = await userModel.findOne({ username: toBeFollowed.toLowerCase() }).select('avatar');
        
        const updatedFollowers ={
            $addToSet:{
                followers: {
                    avatar: avatarFollower.avatar,
                    username: follower.toLowerCase()
                }
            }
        }

        const updatedFollowing = {
            $addToSet:{
                following: {
                    avatar: avatarToBeFollowed.avatar,
                    username: toBeFollowed.toLowerCase()
                }
            }
        }

        const userToBeFollowed = await userModel.findOneAndUpdate({username: toBeFollowed.toLowerCase()}, updatedFollowers, {new:true}).select('followers');
        const userFollower = await userModel.findOneAndUpdate({username: follower.toLowerCase()}, updatedFollowing, {new:true}).select('following');

        createNotification(follower, toBeFollowed, 'newFollower');
        res.status(200).json({userToBeFollowed, userFollower});
    }catch(error){
        console.error(error.message);
        res.status(400).json(error.message);
    }
}

const unfollowUser = async (req, res)=>{
    try{
        const {unfollower, toBeUnfollowed} = req.body

        const targetUser = await userModel.findOne({ username: unfollower.toLowerCase() }).select('following');
        console.log(targetUser);
        if (!targetUser.following.some(user => user.username === toBeUnfollowed.toLowerCase())) {
            return res.status(400).json({ error: 'Nu urmaresti acest utilizator' });
        }

        const updatedFollowers ={
            $pull:{
                followers: {
                    username: unfollower.toLowerCase()
                }
            }
        }

        const updatedFollowing = {
            $pull:{
                following: {
                    username: toBeUnfollowed.toLowerCase()
                }
            }
        }

        console.log(updatedFollowing, updatedFollowers);

        const userToBeUnfollowed = await userModel.findOneAndUpdate({username: toBeUnfollowed.toLowerCase()}, updatedFollowers, {new:true}).select('followers');
        const userUnfollower = await userModel.findOneAndUpdate({username: unfollower.toLowerCase()}, updatedFollowing, {new:true}).select('following');
        res.status(200).json({userToBeUnfollowed, userUnfollower});
    }catch(error){
        console.error(error.message);
        res.status(400).json(error.message);
    }
}

const getFollowers = async (req, res) =>{
    try{
        const {username} = req.query;

        const user = await userModel.findOneAndUpdate({username:username.toLowerCase()}).select('followers');

        console.log(user);

        res.status(200).json({followers: user});
    }catch(error){
        console.error(error.message);
        res.status(400).json(error.message);
    }
}

const getFollowing = async (req, res) =>{
    try{
        const {username} = req.query;

        const user = await userModel.findOneAndUpdate({username:username.toLowerCase()}).select('following');

        console.log(user);

        res.status(200).json({following: user});
    }catch(error){
        console.error(error.message);
        res.status(400).json(error.message);
    }
}

const search = async(req, res) =>{
    try{
        const {search, page = 1, limit = 9} = req.query;
        const limitNum = parseInt(limit);
        const skip = (parseInt(page) - 1) * limitNum;
        console.log(page, skip);
        const users = await userModel.find({username: {$regex: search, $options: 'i'}}).select
        ('username displayName avatar followers following statut').skip(skip).limit(limitNum);

        const totalUsers = await userModel.countDocuments({username: {$regex: search, $options: 'i'}});
        
        res.status(200).json({users, totalUsers});

    }catch(error){
        console.error(error.message);
        res.status(400).json(error.message);
    }
}

module.exports={
    getFollowing,
    getFollowers,
    followUser,
    unfollowUser,
    search
}