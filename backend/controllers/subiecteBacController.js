const userModel = require('../models/userModel')
const subiecteBacModel = require('../models/subiecteBacModel')
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const { createNotification } = require('./notificationController');

const createSubiectBac = async (req, res) =>{
    try{
        const {subject, teacher, profil, allowsHelp, questions, subiect, barem, scurtaDescriere, dificultate} = req.body

        if(!subject || !teacher || !profil || allowsHelp == undefined || !questions || !subiect || !barem){
            return res.status(400).json({error: 'Invalid data!'})
        }

        const checkTeacher = await userModel.findOne({username: teacher.toLowerCase()});

        if(!checkTeacher){
            return res.status(400).json({error: 'Trebuie sa fii logat!'});
        }

        if(checkTeacher.statut !== 'profesor'){
            return res.status(400).json({error: 'Nu esti profesor!'})
        }

        let subId = 1;

        const lastSub = await subiecteBacModel.findOne().sort({ subId: -1 }).select('subId');
        if (lastSub) {
            subId = lastSub.subId + 1;
        }

        const data = {
            subId,
            subject,
            teacher,
            profil,
            subiect,
            barem,
            allowsHelp,
            status: 'pending',
            questions,
            scurtaDescriere,
            dificultate,
            solutions: [],
        }

        await subiecteBacModel.create(data);

        const activitate ={
            type: 'createSubiectBac',
            msg: `a creat un nou subiect, ${subId} pentru profilul ${profil}`,
            currentAvatar: checkTeacher.avatar,
            timestamp: new Date().toLocaleString('ro-RO', { hour12: false })
        }

        await userModel.findOneAndUpdate(
            {username: teacher.toLowerCase()},
            {$addToSet: {activitate: activitate}},
            {new: true}
        )

        res.status(200).json({msg: "Subiectul a fost pus pe pending!"});
    }catch(error){
        console.error(error.message);
        res.status(400).json(error.message);
    }
}

const getSubiectBac = async (req, res) =>{
    try{
        const {subId} = req.params;
        const subiect = await subiecteBacModel.findOne({subId})
        if(!subiect){
            return res.status(404).json({ error: 'Acest subiect nu exista!' });
        }
        res.status(200).json(subiect);
    }catch(error){
        res.status(400).json(error.message);
    }
}

const getSubiecteMaterie = async (req, res) =>{
    try{
        const {materie} = req.params;
        const subiecte = await subiecteBacModel.find({subject: materie.toLowerCase()});
        console.log(subiecte, materie);
        if(!subiecte)
            return res.status(404).json({error: 'Nu exista subiecte postate pentru aceasta materie!'});
        res.status(200).json({subiecte});
    }catch(error){
        res.status(400).json(error.message);
    }
}

const getSubiecteByUser = async (req, res) =>{
    try{
        const {username} = req.query;
        const subiecte = await subiecteBacModel.find({teacher: username.toLowerCase()});
        if(!subiecte)
            return res.status(404).json({error: 'Nu exista subiecte postate de acest utilizator!'});
        res.status(200).json({subiecte});
    }catch(error){
        res.status(400).json(error.message);
    }
}

module.exports={
    createSubiectBac,
    getSubiecteByUser,
    getSubiecteMaterie,
    getSubiectBac
}