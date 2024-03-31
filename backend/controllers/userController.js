const userModel = require('../models/userModel')
const bcrypt = require('bcryptjs');
//const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid');

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
        check=await userModel.findOne({username: req.body.username});
        }else{
        check=await userModel.findOne({email: req.body.username});
        }
        if (check) {
            const passwordMatch = await bcrypt.compare(req.body.password, check.password);

            if (passwordMatch) {
                console.log("User logged in: \n", check);

                // const token = createToken(check._id)

                res.status(200).json({username:check.username});
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
        confirmPassword = req.body.confirmPassword;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        if(password !== confirmPassword){
            throw new Error("Passwords do not match");
        }
        const existingUser = await userModel.find({ username: new RegExp(username, 'i') });
        if(existingUser.length > 0){
          return res.status(400).json({ error: 'Usernameul este deja folosit!' });
        }
        const verfnvlg = username.toLowerCase();
        const cuvinteVulgare = ['pula', 'coae', 'coaie', 'cuaie', 'cacat', 'fut', 'prost', 'natia', 'matii', 'gay', 'futui', 'dracu'
        ,'pizd','cur','muie','sug','gaoz','tarf','curv','bagam','zdreant'];
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
            username: username,
            password: hashedPassword,
            userIp: userIp,
            email: email,
            admin: 0,
        }
        const user = await userModel.create(data);
        console.log("New account created successfully: ", data);
        res.status(200).json({username:data.username});
    }catch(error){
        console.error(error.message);
        res.status(500).json(error.message);
    }
}

module.exports={
    signin,
    signup
}