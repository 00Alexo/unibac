const express = require('express');
const{
    markAllAsRead,
    markOneAsRead
} = require('../controllers/notificationController');

const requireAuth = require('../middleware/requireAuth')

const router = express.Router();

router.use(requireAuth);

router.post('/markAllAsRead', markAllAsRead);
router.post('/markOneAsRead', markOneAsRead);

module.exports = router;