const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel')

const requireAuth = async (req, res, next) =>{

    const {authorization} = req.headers

    if(!authorization){
        return res.status(401).json({error: 'Trebuie sa fii logat pentru a avea acces!'});
    }

    const token = authorization.split(' ')[1];

    try{ //remove for testing
        const {_id} = jwt.verify(token, process.env.SECRET);

        req.user = await userModel.findOne({_id}).select('_id');

        const {userAuth} = req.body;

        if(!userAuth)
            return res.status(401).json({error: 'Autorizatie invalida, logheaza-te din nou!'});

        const user = await userModel.findOne({ username: userAuth.toLowerCase() }).select('_id');
        const userId = user ? user._id.toString() : null; 


        if(userId != _id)
            return res.status(401).json({error: 'Autorizatie invalida, logheaza-te din nou!'});

        next();        
    }catch(error){
        console.error(error.message);
        res.status(401).json({error: 'Autorizatie invalida, logheaza-te din nou!'});
    }
}

module.exports = requireAuth