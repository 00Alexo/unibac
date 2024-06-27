const express = require('express');
const{
    followUser,
    unfollowUser,
    getFollowers,
    getFollowing,
    search
} = require('../controllers/socialController');

const router = express.Router();

router.get('/getFollowing', getFollowing);
router.get('/getFollowers', getFollowers);
router.post('/followUser', followUser);
router.post('/unfollowUser', unfollowUser);
router.get('/search', search);

module.exports = router;