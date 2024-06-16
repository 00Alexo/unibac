const express = require('express');
const{
    markAllAsRead,
    markOneAsRead
} = require('../controllers/notificationController');

const router = express.Router();

router.post('/markAllAsRead', markAllAsRead);
router.post('/markOneAsRead', markOneAsRead);

module.exports = router;