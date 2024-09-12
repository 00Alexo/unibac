const userModel = require('../models/userModel')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid');
var passwordValidator = require('password-validator');
var schema = new passwordValidator();
schema
.is().min(7)
.has().uppercase()
.has().lowercase()
.has().digits(2)

const createToken = (_id) =>{
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}

const signin = async(req, res) =>{
    try{
        let check;

        let errorFields = [];

        if (!req.body.username) errorFields.push("username");
        if (!req.body.password) errorFields.push("pass");
        
        if (errorFields.length > 0) {
            return res.status(400).json({error: 'Toate campurile sunt obligatorii!', errorFields});
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
                errorFields.push("pass");
            return res.status(400).json({error:"Parola gresita", errorFields});
            }
        } else {
            errorFields.push("username");
            return res.status(400).json({error:"Acest cont nu exista", errorFields});
        }

    } catch (error) {
        console.error(error.message);
        return res.status(400).json(error.message);
  }
}

const signup = async(req, res) =>{
    try{
        const saltRounds = 12, userIp = req.clientIp;
        let errorFields = [];
        const email = req.body.email, username = req.body.username, password = req.body.password,
        confirmPassword = req.body.confirmPassword, statut = req.body.statut, judet = req.body.judet;
        if (!email) errorFields.push("email");
        if (!username) errorFields.push("username");
        if (!password) errorFields.push("pass");
        if (!confirmPassword) errorFields.push("cpass");
        if (!statut) errorFields.push("statut");
        if (!judet) errorFields.push("judet");
        
        if (errorFields.length > 0) {
            return res.status(400).json({error: 'Toate campurile sunt obligatorii!', errorFields: errorFields});
        }
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        if(password !== confirmPassword){
            errorFields.push("pass");
            errorFields.push("cpass");
            return res.status(400).json({error:"Parolele nu sunt identice", errorFields: errorFields});
        }
        if(!schema.validate(password)){
            errorFields.push("pass");
            return res.status(400).json({error: 'Parola trebuie sa aiba minim 7 caractere, o litera mare, mica si 2 cifre!', errorFields: errorFields})
        }
        const existingUser = await userModel.findOne({ username: { $regex: new RegExp(`^${username}$`, 'i') } });
        if(existingUser){
            errorFields.push("username");
            return res.status(400).json({ error: 'Usernameul este deja folosit!', errorFields: errorFields});
        }
        const verfnvlg = username.toLowerCase();
        const cuvinteVulgare = ['pula', 'coae', 'coaie', 'cuaie', 'cacat', 'fut', 'prost', 'natia', 'matii', 'gay', 'futui', 'dracu', 'puta'
        ,'pizd','cur','muie','sug','gaoz','tarf','curv','bagam','zdreant'];
        if(!email.includes('@') && !email.includes('+') && !email.includes('%')){
            errorFields.push("email");
            return res.status(400).json({error:"Email invalid!", errorFields: errorFields});
        }
        for(let i = 0; i < cuvinteVulgare.length; i++){
          if(verfnvlg.includes(cuvinteVulgare[i])){
            errorFields.push("username");
            return res.status(400).json({error: 'Numele nu poate sa contina cuvinte vulgare!', errorFields: errorFields});
          }
        }
        if(verfnvlg.includes('admin') || verfnvlg.includes('moderator') || verfnvlg.includes('administrator')){
            errorFields.push("username");
            return res.status(400).json({error: 'Nume interzis!', errorFields: errorFields});
        }
        if(verfnvlg.length>20){
            errorFields.push("username");
            return res.status(400).json({error: 'Numele poate sa aiba maxim 20 de caractere!', errorFields: errorFields})
          }
        if(verfnvlg.includes(' ')){
            errorFields.push("username");
            return res.status(400).json({error: 'Numele nu poate sa contina spatii!', errorFields: errorFields});
        }
        if(!/^[a-zA-Z0-9.]*$/.test(verfnvlg)){
            errorFields.push("username");
            return res.status(400).json({error: 'Numele poate sa contina doar litere din alfabetul englez!', errorFields: errorFields});
        }
        
        const existingEmail = await userModel.findOne({email})
        if(existingEmail){
            errorFields.push("email");
            return res.status(400).json({error:'Emailul este deja folosit!', errorFields: errorFields})
        }

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
                notifications: []
            },
            prompts: [],
            clase: [],
            aboutMe: 'Salut, sunt nou pe comunitate!',
            pagina: '',
            persoaneFavorite: [],
            badges: [{badge: 'Veteran', signification: 'Pionier al platformei!', icon: `<svg version="1.1" id="Capa_1" x="0px" y="0px"
                viewBox="0 0 1200 1200" enable-background="new 0 0 1200 1200">
            <g>
                <path fill="#33342F" d="M969.645,50h-32.351H262.706h-32.351h-37.329v37.329v32.351v755.586v18.698v21.575l18.694,10.77
                    l16.201,9.334l337.296,194.317l16.149,9.304L600,1150l18.634-10.735l16.149-9.304l337.294-194.317l16.202-9.334l18.695-10.77
                    v-21.576v-18.698V119.68V87.329V50H969.645z M974.768,107.795V882.29v16.781l-14.54,8.377l-345.735,199.179L600,1114.976
                    l-14.494-8.349L239.771,907.447l-14.54-8.377V882.29V107.795V78.761h29.034h691.469h29.034V107.795z"/>
                <path fill="#33342F" d="M600,1081.469L945.734,882.29V107.795H254.265V882.29L600,1081.469z M561.306,267.146L600,155.833
                    l38.694,111.313l117.816,2.4l-93.906,71.197l34.125,112.793L600,386.228l-96.733,67.309l34.129-112.793l-93.906-71.197
                    L561.306,267.146z M289.062,380.324L600,559.847l310.938-179.522v117.281L602.074,675.931v2.395L600,677.128l-2.074,1.197v-2.395
                    L289.062,497.606V380.324z M289.062,558.515L600,738.035l310.939-179.52v117.281l-1.037,0.599L602.074,854.119v2.395L600,855.316
                    l-2.074,1.197v-2.395L289.062,675.796V558.515z M289.062,736.703L600,916.225l310.938-179.522v117.281l-308.864,178.325v2.395
                    l-2.074-1.197l-2.074,1.197v-2.395L289.062,853.984V736.703z"/>
                <path fill="#EDB047" d="M254.265,78.761h-29.034v29.034V882.29v16.781l14.54,8.377l345.735,199.179l14.494,8.349l14.494-8.349
                    l345.735-199.179l14.54-8.377V882.29V107.795V78.761h-29.034H254.265z M945.734,107.795V882.29L600,1081.469L254.265,882.29
                    V107.795H945.734z"/>
                <polygon fill="#EDB047" points="597.927,919.816 293.21,743.888 293.21,851.59 597.927,1027.518 	"/>
                <polygon fill="#EDB047" points="906.791,743.888 602.074,919.816 602.074,1027.518 906.791,851.59 	"/>
                <path fill="#EDB047" d="M597.927,1034.704l2.074-1.197l2.074,1.197v-2.395l308.864-178.325V736.703L600,916.225L289.062,736.703
                    v117.281l308.864,178.325V1034.704z M293.21,743.888l304.717,175.928v107.702L293.21,851.59V743.888z M602.074,919.816
                    l304.717-175.928V851.59l-304.717,175.928V919.816z"/>
                <polygon fill="#EDB047" points="597.927,741.626 293.21,565.7 293.21,673.402 597.927,849.328 	"/>
                <polygon fill="#EDB047" points="906.791,565.7 602.074,741.626 602.074,849.328 906.791,673.402 	"/>
                <path fill="#EDB047" d="M597.927,856.514l2.074-1.197l2.074,1.197v-2.395l307.827-177.724l1.037-0.599V558.515L600,738.035
                    l-310.937-179.52v117.281l308.864,178.323V856.514z M293.21,565.7l304.717,175.926v107.702L293.21,673.402V565.7z M602.074,741.626
                    L906.791,565.7v107.702L602.074,849.328V741.626z"/>
                <polygon fill="#EDB047" points="597.927,563.438 293.21,387.51 293.21,495.212 597.927,671.14 	"/>
                <polygon fill="#EDB047" points="906.791,387.51 602.074,563.438 602.074,671.14 906.791,495.212 	"/>
                <path fill="#EDB047" d="M597.927,678.325l2.074-1.197l2.074,1.197v-2.395l308.864-178.325V380.324L600,559.847L289.062,380.324
                    v117.281l308.864,178.325V678.325z M293.21,387.51l304.717,175.928V671.14L293.21,495.212V387.51z M602.074,563.438L906.791,387.51
                    v107.702L602.074,671.14V563.438z"/>
                <polygon fill="#EDB047" points="455.504,273.451 542.2,339.182 510.696,443.317 600,381.173 689.301,443.317 657.801,339.18 
                    744.497,273.451 635.722,271.233 600,168.467 564.279,271.233 	"/>
                <path fill="#EDB047" d="M503.267,453.537L600,386.228l96.729,67.309l-34.125-112.793l93.906-71.197l-117.816-2.4L600,155.833
                    l-38.694,111.313l-117.816,2.4l93.906,71.197L503.267,453.537z M635.722,271.233l108.775,2.218l-86.696,65.729l31.5,104.137
                    L600,381.173l-89.305,62.144L542.2,339.182l-86.696-65.731l108.775-2.218L600,168.467L635.722,271.233z"/>
            </g>
            </svg>
            `
            }],
            activitate: [{type: 'welcome!', msg: `${username}s-a inregistrat pe platforma!`, timestamp: timestamp, currentAvatar: ''}],
        }
        const user = await userModel.create(data);
        const token = createToken(user._id)
        console.log(user._id);
        console.log("Token created: ", token); 
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
  
    const token = authorization.split(' ')[1];
  
    try {
      const { _id } = jwt.verify(token, process.env.SECRET);
  
      req.user = await userModel.findOne({ _id }).select('_id');
  
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
        if(!user){
            return res.status(404).json({ error: 'Acest utilizator nu exista!' });
        }
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

const updateUserAvatar = async(req, res) =>{
    try{
        const {username, avatar} = req.body;
        const activitate = {
            type: 'newAvatar',
            msg: 'si-a modificat poza de profil',
            currentAvatar: avatar,
            timestamp: new Date().toLocaleString('ro-RO', { hour12: false })
        }
        const user = await userModel.findOneAndUpdate({username: username.toLowerCase()}, 
        {$set:{avatar: avatar}, $addToSet: {activitate: activitate}}, {new: true}).select('avatar');
    
        res.status(200).json(user);
    }catch(error){
        console.error(error.message);
        res.status(400).json(error.message);
    }
}

const statusVerifier = async(req, res) =>{
    try{
        const {username} = req.query;

        if(!username)
            return res.status(400).json({error: 'Invalid username'});

        const user = await userModel.findOne({username: username.toLowerCase()}).select('statut');

        if(!user)
            return res.status(400).json({error:'Utilizator invalid!'});

        res.status(200).json({user});
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
    getUserAvatar,
    updateUserAvatar,
    statusVerifier
}