const express = require('express');
const{
    createClass,
    joinClass,
    changeAcces,
    leaveClass,
    kickMember,
    deleteClass,
    transferOwnership,
    createTest,
    getTestData,
    submitTest,
    viewClass,
} = require('../controllers/classController');

const requireAuth = require('../middleware/requireAuth')

const router = express.Router();

router.get('/viewClass/:classId', viewClass);

router.use(requireAuth);

router.post('/createClass', createClass);
router.post('/joinClass', joinClass);
router.patch('/changeAcces', changeAcces);
router.delete('/leaveClass', leaveClass);
router.delete('/kickMember', kickMember);
router.delete('/deleteClass', deleteClass);
router.patch('/transferOwnership', transferOwnership);
router.post('/createTest', createTest);
router.get('/getTestData', getTestData);
router.post('/submitTest', submitTest);

module.exports = router;