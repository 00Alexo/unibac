const userModel = require('../models/userModel')
const classModel = require('../models/classModel');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const { createNotification } = require('./notificationController');

const createClass = async (req, res) =>{
    try{
        const saltRounds = 12
        const {creator, className, password, subject, description, avatar, status} = req.body;

        const checkCreator = await userModel.findOne({username: creator.toLowerCase()}).select('statut');

        if(checkCreator.statut !== 'profesor')
            return res.status(400).json({error: 'Trebuie sa ai statutul de profesor ca sa poti crea o clasa!'})

        let classId = 1;

        const lastClass = await classModel.findOne().sort({ classId: -1 }).select('classId');
        if (lastClass) {
            classId = lastClass.classId + 1;
        }

        console.log(classId);

        let hashedPassword = null;

        if(status === 'private')
            hashedPassword = await bcrypt.hash(password, saltRounds);

        const data = {
            creator,
            className,
            classId,
            password: hashedPassword,
            status,
            subject,
            description,
            teachers: [],
            avatar,
            students: [],
            assignments: [],
            lessons: [],
            tests: [],
            logs: [`${creator} a creat clasa cu succes!`]
        }

        const clasa = await classModel.create(data)

        const data2 = {
            classId: classId,
            statut: "owner"
        }

        await userModel.findOneAndUpdate(
            {username: creator.toLowerCase()},
            {$addToSet: {clase: data2}},
            {new: true}
        )

        res.status(200).json(clasa);
    }catch(error){
        console.error(error.message);
        res.status(400).json(error.message);
    }
}

const joinClass = async (req, res) =>{
    try{
        const {classId, password, username} = req.body;

        if(!classId) 
            return res.status(400).json("Toate campurile sunt obligatorii!");

        if(!username)
            return res.status(400).json("Utilizator invalid");

        const check1 = await userModel.findOne({username: username.toLowerCase()});
        if(!check1)
            return res.status(400).json("Utilizator invalid");

        const check = await classModel.findOne({classId});

        if(!check)
            return res.status(400).json("Aceasta clasa nu exista");

        if(!password && check.status == 'private')
            return res.status(400).json("Toate campurile sunt obligatorii!");

        let passwordMatch = null;

        if(check.status === 'private')
            passwordMatch = await bcrypt.compare(password, check.password);

        if (!passwordMatch && check.status === 'private') {
            return res.status(400).json({ error: "Parola gresita" });
        }

        const check2 = await classModel.findOne({classId});

        if(check2.students?.includes(username.toLowerCase()) || check2.teachers?.includes(username.toLowerCase()))
            return res.status(400).json("Deja faci parte din aceasta clasa.");

         await classModel.findOneAndUpdate(
            { classId },
            { $addToSet: { students: username.toLowerCase() , logs:`${username} s-a alaturat clasei cu succes!`}},
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
        const {teacher, username, classId, action} = req.body

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

        if(check2.creator != teacher.toLowerCase())
            return res.status(400).json({error: 'Doar creatorul poate sa faca acest lucru!'})

        if(action === 'up'){
            if(check2.teachers.includes(username.toLowerCase()))
                return res.status(400).json("Utilizatorul este deja profesor.");

            await classModel.findOneAndUpdate(
                {classId: classId}, 
                {$pull: {students: username.toLowerCase()},
                $addToSet: {teachers: username.toLowerCase(), logs: `${username} a fost promovat la functia de profesor de catre ${teacher}`}},
                {new: true}
            )

            await userModel.findOneAndUpdate(
                {username:username.toLowerCase()},
                {$set: { 'clase.$[elem].statut': "profesor"}},
                {new: true,  arrayFilters: [{ "elem.classId": classId }]}
            )

            res.status(200).json("Acest elev a fost promovat la functia de profesor.")
        }else if(action === 'down'){
            if(check2.students.includes(username.toLowerCase()))
                return res.status(400).json("Utilizatorul este deja elev.");

            await classModel.findOneAndUpdate(
                {classId: classId}, 
                {$pull: {teachers: username.toLowerCase()},
                $addToSet: {students: username.toLowerCase(), logs: `${username} a fost retrogradat la functia de elev de catre ${teacher}`}},
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
            return res.status(400).json("Nu faci parte din aceasta clasa sau esti creatorul ei.");

        await classModel.findOneAndUpdate(
            {classId: classId},
            {$pull:{students: username.toLowerCase(), teachers: username.toLowerCase()},
            $addToSet: {logs: `${username} a parasit clasa...`}},
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

//TODO + putin de lucrat la minaAi responsiveness +++++++ ERROR HANDLING ORBULE, TU PUI FARA {ERROR} LA FIECARE PROSTULE

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

        if(!check3.students?.includes(username.toLowerCase()) && !check3.teachers?.includes(username.toLowerCase()))
            return res.status(400).json("Acest utilizator nu face parte din clasa respectiva.");

        if (!check3.teachers?.includes(teacher.toLowerCase()) && check3.creator !== teacher.toLowerCase())
            return res.status(400).json("Doar creatorul si profesorii pot da afara un utilizator din clasa.");
        
        if(username === teacher) 
            return res.status(400).json({error: "Nu poti sa te dai afara singur din clasa."})

        if(check3.creator != teacher && check3.teachers.includes(username.toLowerCase()))
            return res.status(400).json({error: "Doar creatorul poate sa dea afara alti profesori!"});

        await classModel.findOneAndUpdate(
            {classId: classId},
            {$pull:{students: username.toLowerCase(), teachers: username.toLowerCase()},
            $addToSet: {logs: `${username} a fost data afara de catre ${teacher}.`}},
            {new: true}
        )

        await userModel.findOneAndUpdate(
            {username: username.toLowerCase()},
            {$pull: {clase: {classId: classId}}},
        )

        createNotification(teacher, username, 'classKick',
        `<span style="color:white; font-size:1.05rem; cursor:pointer;" 
        //onclick="navigateToProfile('${teacher}')">${teacher}</span> te-a dat afara din clasa cu id-ul ${classId}.`);

        res.status(200).json(`Utilizatorul ${username} a fost dat afara din clasa cu succes`);
    }catch(error){
        console.error(error.message);
        res.status(400).json(error.message);
    }
}

const deleteClass = async (req, res) =>{
    try{
        const {username, classId} = req.body;

        const check = await userModel.findOne({username: username.toLowerCase()});
        
        if(!check) 
            return res.status(400).json({error:"Utilizator invalid!"});

        const check2 = await classModel.findOne({classId});

        if(!check2)
            return res.status(400).json({error:"Clasa invalida!"});

        if(check2.creator !== username)
            return res.status(400).json({error:'Doar creatorul poate sa stearga clasa!'});

        await classModel.deleteOne({classId});

        const members = [...check2.students, ...check2.teachers, check2.creator ];

        
        await userModel.updateMany(
            { username: { $in: members } },
            { $pull: { clase: { classId: classId } } }
        );

        res.status(200).json("Clasa a fost stearsa cu succes!");
    }catch(error){
        console.error(error.message);
        res.status(400).json(error.message);
    }
}

const transferOwnership = async (req, res) => {
    try{
        const {username, classId, newOwner} = req.body;

        if(username === newOwner)
            return res.status(400).json({error: "Nu poti sa iti cedezi clasa singur."});

        const check = await userModel.findOne({username: username.toLowerCase()});
        
        if(!check) 
            return res.status(400).json({error:"Utilizator invalid!"});

        const check2 = await classModel.findOne({classId});

        if(!check2)
            return res.status(400).json({error:"Clasa invalida!"});

        const check3 = await userModel.findOne({username: newOwner.toLowerCase()});

        if(!check3)
            return res.status(400).json({error:"Utilizator invalid!"});

        if(check2.creator !== username)
            return res.status(400).json({error:'Nu esti creatorul clasei'});

        if(!check2.teachers.includes(newOwner))
            return res.status(400).json({error:"Noul administrator trebuie sa fie profesor in clasa respectiva ca sa poti ceda clasa."});

        await classModel.updateOne({classId}, {$set:{creator: newOwner}, $pull:{teachers:newOwner}, $addToSet: 
        {logs: `${username} a cedat clasa catre ${newOwner}.`}});

        await classModel.updateOne({classId}, {$addToSet:{teachers:username}});

        await userModel.findOneAndUpdate(
            {username:username.toLowerCase()},
            {$set: { 'clase.$[elem].statut': "teacher"}},
            {new: true,  arrayFilters: [{ "elem.classId": classId }]}
        )

        await userModel.findOneAndUpdate(
            {username:newOwner.toLowerCase()},
            {$set: { 'clase.$[elem].statut': "creator"}},
            {new: true,  arrayFilters: [{ "elem.classId": classId }]}
        )

        createNotification(username, newOwner, 'classKick',
            `<span style="color:white; font-size:1.05rem; cursor:pointer;" 
            //onclick="navigateToProfile('${username}')">${username}</span> ti-a acordat clasa cu id-ul ${classId}.`);

        res.status(200).json(`${newOwner} este acum administratorul clasei.`)

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
    kickMember,
    deleteClass,
    transferOwnership
}