const userModel = require('../models/userModel')
const classModel = require('../models/classModel');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const { createNotification } = require('./notificationController');

const createClass = async (req, res) =>{
    try{
        const saltRounds = 12
        const {creator, className, password, subject, description, avatar} = req.body;


        let classId = 1;
        const classCount = await classModel.countDocuments();
        console.log(classCount);
        if(classCount !== 0)
            classId = classCount + 1;
        console.log(classId);

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const data = {
            creator,
            className,
            classId,
            password: hashedPassword,
            subject,
            description,
            teachers: [],
            avatar,
            students: [],
            assignments: [],
            lessons: [],
        }

        const clasa = await classModel.create(data)

        res.status(200).json(clasa);
    }catch(error){
        console.error(error.message);
        res.status(400).json(error.message);
    }
}

const joinClass = async (req, res) =>{
    try{
        const {classId, password, username} = req.body;

        if(!classId || !password) 
            return res.status(400).json("Toate campurile sunt obligatorii!");

        if(!username)
            return res.status(400).json("Utilizator invalid");

        const check1 = await userModel.findOne({username: username.toLowerCase()});
        if(!check1)
            return res.status(400).json("Utilizator invalid");

        const check = await classModel.findOne({classId});

        if(!check)
            return res.status(400).json("Aceasta clasa nu exista");

        const passwordMatch = await bcrypt.compare(password, check.password);

        if (!passwordMatch) {
            return res.status(400).json({ error: "Parola gresita" });
        }

        const check2 = await classModel.findOne({classId});

        if(check2.students?.includes(username.toLowerCase()) || check2.teachers?.includes(username.toLowerCase()))
            return res.status(400).json("Deja faci parte din aceasta clasa.");

         await classModel.findOneAndUpdate(
            { classId },
            { $addToSet: { students: username.toLowerCase() } },
            { new: true }
        );


        const data = {
            classId: classId,
            statut: "elev"
        }
        await userModel.findOneAndUpdate(
            {username: username.toLowerCase()},
            {$addToSet: {clase: data}},
            {new: true}
        )

        res.status(200).json(`Te-ai alaturat cu succes clasei cu id-ul ${classId}`);
        
    }catch(error){
        console.error(error.message);
        res.status(400).json(error.message);
    }
}

const changeAcces = async (req, res) =>{
    try{
        const {username, classId, action} = req.body

        if(!classId){
            return res.status(400).json("Clasa invalida!");
        }

        const check = await userModel.findOne({username:username.toLowerCase()})

        if(!check){
            return res.status(400).json("Utilizator invalid!");
        }

        const check2 = await classModel.findOne({classId});

        if(!check2.students?.includes(username.toLowerCase()) && !check2.teachers?.includes(username.toLowerCase()))
            return res.status(400).json("Acest utilizator nu face parte din clasa respectiva!");

        if(action === 'up'){
            await classModel.findOneAndUpdate(
                {classId: classId}, 
                {$pull: {students: username.toLowerCase()},
                $addToSet: {teachers: username.toLowerCase()}},
                {new: true}
            )

            await userModel.findOneAndUpdate(
                {username:username.toLowerCase()},
                {$set: { 'clase.$[elem].statut': "profesor"}},
                {new: true,  arrayFilters: [{ "elem.classId": classId }]}
            )

            res.status(200).json("Acest elev a fost promovat la functia de profesor.")
        }else if(action === 'down'){
            await classModel.findOneAndUpdate(
                {classId: classId}, 
                {$pull: {teachers: username.toLowerCase()},
                $addToSet: {students: username.toLowerCase()}},
                {new: true}
            )

            await userModel.findOneAndUpdate(
                {username:username.toLowerCase()},
                {$set: { 'clase.$[elem].statut': "elev"}},
                {new: true,  arrayFilters: [{ "elem.classId": classId }]}
            )

            res.status(200).json("Acest profesor este acum elev.")
        }
    }catch(error){
        console.error(error.message);
        res.status(400).json(error.message);
    }
}


const leaveClass = async (req, res) =>{
    try{
        const {classId, username} = req.body;

        if(!classId){
            return res.status(400).json("Clasa invalida!");
        }else if(!username){
            return res.status(400).json("Utilizator invalid!");
        }

        const check = await userModel.findOne({username:username.toLowerCase()})

        if(!check){
            return res.status(400).json("Utilizator invalid!");
        }

        const check2 = await classModel.findOne({classId});

        if(!check2.students?.includes(username.toLowerCase()) && !check2.teachers?.includes(username.toLowerCase()))
            return res.status(400).json("Nu faci parte din aceasta clasa.");

        await classModel.findOneAndUpdate(
            {classId: classId},
            {$pull:{students: username.toLowerCase(), teachers: username.toLowerCase()}},
            {new: true}
        )

        await userModel.findOneAndUpdate(
            {username: username.toLowerCase()},
            {$pull: {clase: {classId: classId}}},
        )

        res.status(200).json("Ai parasit cu succes clasa!");
    }catch(error){
        console.error(error.message);
        res.status(400).json(error.message);
    }
}

//TODO: sa faci un mic rehaul la notificari +++ SECURITATE BAI PROSTULE CA POATE GIGEL PAPUCEL SA TI DEA KICK DIN ORICE CLASA IN MM DE INAPT 
//TODO ++ VERIFICARE DACA I PROFeSOR BAI prOStUlE, VREI SA TI FACA GIGELPAPUC DE 11 ANI CLASA: 'TUTORIAL CUM SA DAI LABA'???

const kickMember = async (req, res) =>{
    try{
        const {classId, username, teacher} = req.body

        if(!classId)
            return res.status(400).json("Clasa invalida!");

        const check = await userModel.findOne({username:username.toLowerCase()})

        if(!check){
            return res.status(400).json("Utilizator invalid!");
        }

        const check2 = await userModel.findOne({username: teacher.toLowerCase()})

        if(!check2){
            return res.status(400).json("Utilizator invalid!");
        }

        const check3 = await classModel.findOne({classId});

        if(!check3.students?.includes(username.toLowerCase()) && !check2.teachers?.includes(username.toLowerCase()))
            return res.status(400).json("Acest utilizator nu face parte din clasa respectiva.");

        await classModel.findOneAndUpdate(
            {classId: classId},
            {$pull:{students: username.toLowerCase(), teachers: username.toLowerCase()}},
            {new: true}
        )

        await userModel.findOneAndUpdate(
            {username: username.toLowerCase()},
            {$pull: {clase: {classId: classId}}},
        )

        //createNotification(teacher, username, 'classKick', `Ai fost dat afara din clasa cu id-ul ${classId} de catre ${teacher}`);

        res.status(200).json(`Utilizatorul ${username} a fost dat afara din clasa cu succes`);
    }catch(error){
        console.error(error.message);
        res.status(400).json(error.message);
    }
}

module.exports={
    createClass,
    changeAcces,
    joinClass,
    leaveClass,
    kickMember
}