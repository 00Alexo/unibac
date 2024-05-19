require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const requestIp = require('request-ip');
const userRoutes = require('./routes/userRoutes')
const app = express();


app.use(requestIp.mw());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use((req, res, next) =>{
    console.log(req.path, req.method)
    if (req.url === '/' && req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Wassup amigo');
    }
    next();
 })
app.use('/api/user', userRoutes)

mongoose.connect(process.env.mongoDB)
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error);
}); 


app.listen(process.env.PORT, () => {
    console.log('listening on port', process.env.PORT);
  });