const express = require('express');
const{
    followUser,
    unfollowUser,
    getFollowers,
    getFollowing,
    search,
    addToFavoritePeople,
    removeFromFavoritePeople
} = require('../controllers/socialController');

const requireAuth = require('../middleware/requireAuth')

const router = express.Router();

router.get('/getFollowing', getFollowing);
router.get('/getFollowers', getFollowers);
router.post('/followUser', requireAuth, followUser);
router.post('/unfollowUser', requireAuth, unfollowUser);
router.get('/search', search);
router.put('/addToFavoritePeople', requireAuth, addToFavoritePeople);
router.delete('/removeFromFavoritePeople', requireAuth, removeFromFavoritePeople);

module.exports = router;