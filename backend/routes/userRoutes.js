const express = require('express');
const{
    signup,
    signin,
    verifyUserAuthData,
    getUserProfile
} = require('../controllers/userController');

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/verifyUserAuthData', verifyUserAuthData);
router.get('/getUserProfile/:username', getUserProfile);

module.exports = router;