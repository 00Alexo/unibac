const express = require('express');
const{
    createClass,
    joinClass,
    changeAcces,
    leaveClass,
    kickMember
} = require('../controllers/classController');

const requireAuth = require('../middleware/requireAuth')

const router = express.Router();

router.use(requireAuth);

router.post('/createClass', createClass);
router.post('/joinClass', joinClass);
router.patch('/changeAcces', changeAcces);
router.delete('/leaveClass', leaveClass);
router.delete('/kickMember', kickMember);


module.exports = router;