const mongoose = require('mongoose');

const LogInSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true,
    },
    displayName:{
      type: String,
      required: true,
    }, 
    password: {
      type: String,
      required: true,
    },
    userIp:{
      type: String,
      required: true
    },
    admin: {
      type: Number,
      required: true,
    },
    email: { 
      type: String, 
      required: true,
      unique: true,
    },
    statut: {
      type: String,
      required: true,
    },
    judet: {
      type: String,
      required: true
    },
    background:{
      type: String,
      required: true
    },
    avatar:{
      type: String,
      required: false
    },
    followers:{
      type: Array,
      required: true
    },
    following:{
      type: Array,
      required: true
    },
    friends:{
      type: Array,
      required: true
    },
    notifications:{
      type: Object,
      required: true
    },
    prompts:{
      type: Array,
      required: true
    },
    clase:{
      type: Array,
      required: true
    }
    /*tags:{
      type: Array,
      required: true
    },
    friends:{
      type: Array,
      required: true
    },
    verification:{
      type: Object,
      required: true
    },
    activitate:{
      type: Array,
      required: true
    }*/
  }, {timestamps: true});
  
  LogInSchema.index({ email: 1 }, { unique: true });
  
  const LogInCollection = mongoose.model("LogInCollection", LogInSchema);
  
  module.exports = LogInCollection;