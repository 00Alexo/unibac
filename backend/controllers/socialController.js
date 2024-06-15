const userModel = require('../models/userModel')
const { v4: uuidv4 } = require('uuid');

const followUser = async (req, res)=>{
    try{
        const {follower, toBeFollowed} = req.body;

        const targetUser = await userModel.findOne({ username: follower.toLowerCase() }).select('following');
        console.log(targetUser);
        if (targetUser.following.includes(toBeFollowed.toLowerCase())) {
            return res.status(400).json({ error: 'Deja urmaresti acest utilizator!' });
        }
        
        const updatedFollowers ={
            $addToSet:{
                followers: `${follower.toLowerCase()}`
            }
        }

        const updatedFollowing = {
            $addToSet:{
                following: `${toBeFollowed.toLowerCase()}`
            }
        }

        const userToBeFollowed = await userModel.findOneAndUpdate({username: toBeFollowed.toLowerCase()}, updatedFollowers, {new:true}).select('followers');
        const userFollower = await userModel.findOneAndUpdate({username: follower.toLowerCase()}, updatedFollowing, {new:true}).select('following');

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
        if (!targetUser.following.includes(toBeUnfollowed.toLowerCase())) {
            return res.status(400).json({ error: 'Nu urmaresti acest utilizator' });
        }

        const updatedFollowers ={
            $pull:{
                followers: `${unfollower.toLowerCase()}`
            }
        }

        const updatedFollowing = {
            $pull:{
                following: `${toBeUnfollowed.toLowerCase()}`
            }
        }

        const userToBeUnfollowed = await userModel.findOneAndUpdate({username: toBeUnfollowed.toLowerCase()}, updatedFollowers, {new:true}).select('followers');
        const userUnfollower = await userModel.findOneAndUpdate({username: unfollower.toLowerCase()}, updatedFollowing, {new:true}).select('following');

        res.status(200).json({userToBeUnfollowed, userUnfollower});
    }catch(error){
        console.error(error.message);
        res.status(400).json(error.message);
    }
}

module.exports={
    followUser,
    unfollowUser
}