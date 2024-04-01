const express = require('express');
const{
    signup,
    signin,
    verifyUserAuthData
} = require('../controllers/userController');

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/verifyUserAuthData', verifyUserAuthData);

module.exports = router;