const userModel = require('../models/userModel')
const subiecteBacModel = require('../models/subiecteBacModel')
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const { createNotification } = require('./notificationController');

const createSubiectBac = async (req, res) =>{
    try{
        const {subject, teacher, profil, allowsHelp, questions} = req.body

        if(!subject || !teacher || !profil || allowsHelp == undefined || !questions){
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
            allowsHelp,
            status: 'verification',
            questions,
            solutions: [],
        }

        const subiect = await subiecteBacModel.create(data);

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

        res.status(200).json(subiect);
    }catch(error){
        console.error(error.message);
        res.status(400).json(error.message);
    }
}

module.exports={
    createSubiectBac
}