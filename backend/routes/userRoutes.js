const express = require('express');
const{
    signup,
    signin,
    verifyUserAuthData,
    getUserProfile,
    getUserAvatar,
    updateUserAvatar,
    statusVerifier
} = require('../controllers/userController');

const requireAuth = require('../middleware/requireAuth')

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/verifyUserAuthData', verifyUserAuthData);
router.get('/getUserProfile/:username', getUserProfile);
router.get('/getUserAvatar', getUserAvatar);
router.post('/updateUserAvatar', requireAuth, updateUserAvatar);
router.get('/statusVerifier', requireAuth,  statusVerifier);

module.exports = router;