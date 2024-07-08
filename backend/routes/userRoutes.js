const express = require('express');
const{
    signup,
    signin,
    verifyUserAuthData,
    getUserProfile,
    getUserAvatar,
    updateUserAvatar
} = require('../controllers/userController');

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/verifyUserAuthData', verifyUserAuthData);
router.get('/getUserProfile/:username', getUserProfile);
router.get('/getUserAvatar', getUserAvatar);
router.post('/updateUserAvatar', updateUserAvatar);

module.exports = router;