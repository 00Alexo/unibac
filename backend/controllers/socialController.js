const userModel = require('../models/userModel')
const { v4: uuidv4 } = require('uuid');
const {
    createNotification
} = require('../controllers/notificationController')

const followUser = async (req, res)=>{
    try{
        const {follower, toBeFollowed} = req.body;
        console.log(follower, toBeFollowed);

        if(follower == toBeFollowed){
            return res.status(400).json({error: "Nu poti sa iti dai follow singur!"});
        }

        const targetUser = await userModel.findOne({ username: follower.toLowerCase() }).select('following');
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

        createNotification(follower, toBeFollowed, 'newFollower', 
        `<span style="color:white; font-size:1.05rem; cursor:pointer;" onclick="navigateToProfile('${follower}')">${follower}</span> a inceput sa te urmareasca!`);
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

        const user = await userModel.findOne({username:username.toLowerCase()}).select('followers');

        if(!user)
            return res.status(400).json({error: "Trebuie sa fii logat"});

        res.status(200).json({followers: user});
    }catch(error){
        console.error(error.message);
        res.status(400).json(error.message);
    }
}

const getFollowing = async (req, res) =>{
    try{
        const {username} = req.query;

        const user = await userModel.findOne({username:username.toLowerCase()}).select('following');

        if(!user)
            return res.status(400).json({error: "Trebuie sa fii logat"});


        res.status(200).json({following: user});
    }catch(error){
        console.error(error.message);
        res.status(400).json(error.message);
    }
}

const addToFavoritePeople = async (req, res) =>{
    try{
        const {username, toBeFavorited} = req.body;

        if(!username || !toBeFavorited)
            return res.status(400).json({error: 'INVALID INFORMATION!'});

        const ver = await userModel.findOne({username: toBeFavorited.toLowerCase()});

        if(!ver)
            return res.status(400).json({error: 'Acest utilizator nu exista.'});

        const verif = await userModel.findOne({username: username.toLowerCase()});

        const verif2 = verif.persoaneFavorite.some(fav => fav.username == toBeFavorited.toLowerCase());

        if(verif2)
            return res.status(400).json({error: 'Utilizatorul se afla deja in lista favoritilor.'})

        const avatar = ver.avatar;

        const newObj = {
            username: toBeFavorited.toLowerCase(),
            avatar: avatar
        }

        const user = await userModel.findOneAndUpdate(
            {username: username.toLowerCase()}, 
            {$push: {persoaneFavorite: newObj}},
            { new: true }
        ).select('persoaneFavorite');

        if(!user)
            return res.status(400).json({error: 'Trebuie sa fii logat!'})

        res.status(200).json({msg:"Utilizatorul a fost adaugat la favoriti."});
    }catch(error){
        console.error(error.message);
        res.status(400).json(error.message);
    }
}

const removeFromFavoritePeople = async (req, res) =>{
    try{
        const {username, toBeRemoved} = req.body;

        if(!username || !toBeRemoved)
            return res.status(400).json({error: 'INVALID INFORMATION!'});

        const ver = await userModel.findOne({username: toBeRemoved.toLowerCase()});

        if(!ver)
            return res.status(400).json({error: 'Acest utilizator nu exista.'});

        const verif = await userModel.findOne({username: username.toLowerCase()});

        const verif2 = verif.persoaneFavorite.some(fav => fav.username == toBeRemoved.toLowerCase());

        if(!verif2)
            return res.status(400).json({error: 'Utilizatorul nu se afla in lista favoritilor.'})

        const user = await userModel.findOneAndUpdate(
            {username: username.toLowerCase()}, 
            {$pull: {persoaneFavorite: {username: toBeRemoved.toLowerCase()}}},
            { new: true }
        ).select('persoaneFavorite');

        if(!user)
            return res.status(400).json({error: 'Trebuie sa fii logat!'})

        res.status(200).json({msg:"Utilizatorul a fost scos de la favoriti."});
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
    search,
    addToFavoritePeople,
    removeFromFavoritePeople
}