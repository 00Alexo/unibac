const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel')

const requireAuth = async (req, res, next) =>{

    const {authorization} = req.headers

    if(!authorization){
        return res.status(401).json({error: 'Trebuie sa fii logat pentru a avea acces!'});
    }

    const token = authorization.split(' ')[1];

    try{
        const {_id} = jwt.verify(token, process.env.SECRET);

        req.user = await userModel.findOne({_id}).select('_id');

        next();        
    }catch(error){
        console.error(error.message);
        res.status(401).json({error: 'Autorizatie invalida, logheaza-te din nou!'});
    }
}

module.exports = requireAuth