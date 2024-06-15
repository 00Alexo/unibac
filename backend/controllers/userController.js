const userModel = require('../models/userModel')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid');
var passwordValidator = require('password-validator');
var schema = new passwordValidator();
schema
.is().min(7)                                    // Minimum length 8
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(2)                                // Must have at least 2 digits

const createToken = (_id) =>{
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}

const signin = async(req, res) =>{
    try{
        let check;
        if(!req.body.username || !req.body.password){
            return res.status(400).json({error:"Toate campurile sunt obligatorii!"});
        }
        let signinValidator = req.body.username.split("");
        let isEmail = false;
        for (let i =0; i < signinValidator.length; i++) {
            if(signinValidator[i] == '@'){
                isEmail = true;
                break;
            }
        }
        if(!isEmail) {
        check=await userModel.findOne({username: req.body.username.toLowerCase()});
        }else{
        check=await userModel.findOne({email: req.body.username});
        }
        if (check) {
            const passwordMatch = await bcrypt.compare(req.body.password, check.password);

            if (passwordMatch) {
                console.log("User logged in: \n", check);

                const token = createToken(check._id)

                res.status(200).json({username:check.username, token});
            } else {
            return res.status(400).json({error:"Parola gresita"});
            }
        } else {
            return res.status(400).json({error:"Acest cont nu exista"});
        }

    } catch (error) {
        console.error(error.message);
        return res.status(400).json(error.message);
  }
}

const signup = async(req, res) =>{
    try{
        const saltRounds = 12, userIp = req.clientIp;
        const email = req.body.email, username = req.body.username, password = req.body.password,
        confirmPassword = req.body.confirmPassword, statut = req.body.statut, judet = req.body.judet;
        if(!email || !username || !password || !confirmPassword || !statut || !judet) 
            return res.status(400).json({error: 'Toate campurile sunt obligatorii!'});
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        if(password !== confirmPassword){
            return res.status(400).json({error:"Parolele nu sunt identice"});
        }
        if(!schema.validate(password))
            return res.status(400).json({error: 'Parola trebuie sa aiba minim 7 caractere, cel putin o litera mare, o litera mica si 2 cifre!'})
        const existingUser = await userModel.findOne({ username: { $regex: new RegExp(`^${username}$`, 'i') } });
        if(existingUser){
            return res.status(400).json({ error: 'Usernameul este deja folosit!' });
        }
        const verfnvlg = username.toLowerCase();
        const cuvinteVulgare = ['pula', 'coae', 'coaie', 'cuaie', 'cacat', 'fut', 'prost', 'natia', 'matii', 'gay', 'futui', 'dracu'
        ,'pizd','cur','muie','sug','gaoz','tarf','curv','bagam','zdreant'];
        if(!email.includes('@') && !email.includes('+') && !email.includes('%'))
            return res.status(400).json({error:"Email invalid!"});
        for(let i = 0; i < cuvinteVulgare.length; i++){
          if(verfnvlg.includes(cuvinteVulgare[i])){
            return res.status(400).json({error: 'Numele nu poate sa contina cuvinte vulgare!'});
          }
        }
        if(verfnvlg.includes('admin') || verfnvlg.includes('moderator') || verfnvlg.includes('administrator')){
            return res.status(400).json({error: 'Nume interzis!'});
        }
        if(verfnvlg.length>20){
            return res.status(400).json({error: 'Numele poate sa aiba maxim 20 de caractere!'})
          }
        if(verfnvlg.includes(' '))
            return res.status(400).json({error: 'Numele nu poate sa contina spatii!'});
        if(!/^[a-zA-Z0-9.]*$/.test(verfnvlg))
            return res.status(400).json({error: 'Numele poate sa contina doar litere din alfabetul englez!'});
        
        const existingEmail = await userModel.findOne({email})
        if(existingEmail)
            return res.status(400).json({error:'Emailul este deja folosit!'})

        const date = new Date();

        const timestamp = date.toLocaleString('ro-RO', { hour12: false });

        const data = {
            background: 'https://i.imgur.com/wJtaWP8.jpeg',
            avatar: '',
            username: username.toLowerCase(),
            password: hashedPassword,
            userIp: userIp,
            email: email,
            statut: statut,
            judet: judet,
            admin: 0,
            displayName: username,
            followers: [],
            following: [],
            friends: [],
            notifications:{
                unread: 0,
                read: 0,
                notifications: []
            }
        }
        const user = await userModel.create(data);
        const token = createToken(user._id)
        console.log("New account created successfully: ", data);
        res.status(200).json({username:data.username, token});
    }catch(error){
        console.error(error.message);
        res.status(400).json(error.message);
    }
}

const verifyUserAuthData = async (req, res) => {
    const { authorization, username } = req.headers;
  
    if (!authorization) {
      return res.status(200).json({ mssg: "Not logged in" });
    }
  
    const user = await userModel.findOne({ username:username.toLowerCase() }).select('_id');
    console.log("userFAKE", user);
  
    const token = authorization.split(' ')[1];
  
    try {
      const { _id } = jwt.verify(token, process.env.SECRET);
  
      req.user = await userModel.findOne({ _id }).select('_id');
      console.log("userREAL: ", req.user);
  
      if (_id == user._id) {
        return res.status(200).json({ mssg: "Autentificare valida" });
      } else {
        return res.status(401).json({ error: 'Request is not authorized' });
      }
  
    } catch (error) {
      console.log(error);
      res.status(401).json({ error: 'Request is not authorized' });
    }
  };

const getUserProfile = async (req, res) =>{
    try{
        const {username} = req.params;
        const user = await userModel.findOne({username: username.toLowerCase()}).select(`-password -userIp `)
        console.log(user);
        if(!user){
            return res.status(404).json({ error: 'Acest utilizator nu exista!' });
        }
        console.log(user);
        res.status(200).json(user);
    }catch(error){
        res.status(400).json(error.message);
    }
}

const getUserAvatar = async(req, res)=>{
    try{
        const {username} = req.query;
        const avatar = await userModel.findOne({username: username.toLowerCase()}).select('avatar');
        if(!avatar){
            return res.status(404).json({error: 'Acest utilizator nu exista!'});
        }
        res.status(200).json(avatar);
    }catch(error){
        console.error(error.message);
        res.status(400).json(error.message);
    }
}
 
module.exports={
    signin,
    signup,
    verifyUserAuthData,
    getUserProfile,
    getUserAvatar
}