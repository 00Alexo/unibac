const express = require('express');
const{
    createClass,
    joinClass,
    changeAcces,
    leaveClass,
    kickMember,
    deleteClass,
    transferOwnership
} = require('../controllers/classController');

const requireAuth = require('../middleware/requireAuth')

const router = express.Router();

router.use(requireAuth);

router.post('/createClass', createClass);
router.post('/joinClass', joinClass);
router.patch('/changeAcces', changeAcces);
router.delete('/leaveClass', leaveClass);
router.delete('/kickMember', kickMember);
router.delete('/deleteClass', deleteClass);
router.patch('/transferOwnership', transferOwnership);

module.exports = router;