const express = require('express');
const{
    chatMinaAi
} = require('../controllers/minaAiController');

const router = express.Router();

router.post('/chatMinaAi', chatMinaAi)

module.exports = router;