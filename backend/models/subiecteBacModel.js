const mongoose = require('mongoose');

const subiecteBac = new mongoose.Schema({
    subject: {
        type: String,
        required: true,
    },
    teacher:{
        type: String,
        required: true,
    },
    profil:{
        type: String,
        required: true
    },
    questions:{
        type: Array,
        required: true
    },
    allowsHelp:{
        type: Boolean,
        required: true
    },
    status:{
        type: String,
        required: true
    },
    subId:{
        type: Number,
        required: true
    },
    solutii:{
        type: Array,
        required: true
    }

  }, {timestamps: true});

  
module.exports = mongoose.model('SubiecteBac', subiecteBac)