require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const requestIp = require('request-ip');
const userRoutes = require('./routes/userRoutes');
const socialRoutes = require('./routes/socialRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const minaAiRoutes = require('./routes/minaAiRoutes');
const classRoutes = require('./routes/classRoutes');
const subiecteBacRoutes = require('./routes/subiecteBacRoutes');
const app = express();

const allowedOrigin = process.env.ALLOWED_ORIGIN || 'http://localhost:3000';

const corsOptions = {
    origin: allowedOrigin,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'username'],
    credentials: true
};

app.use(cors(corsOptions));

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
app.use('/api/social', socialRoutes)
app.use('/api/notifications', notificationRoutes)
app.use('/api/minaAi', minaAiRoutes);
app.use('/api/class', classRoutes)
app.use('/api/subiecteBac', subiecteBacRoutes)

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