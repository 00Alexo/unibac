const express = require('express');
const{
    followUser,
    unfollowUser
} = require('../controllers/socialController');

const router = express.Router();

router.post('/followUser', followUser);
router.post('/unfollowUser', unfollowUser);

module.exports = router;