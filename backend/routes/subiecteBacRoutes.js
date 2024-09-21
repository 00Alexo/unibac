const express = require('express');
const{
    createSubiectBac
} = require('../controllers/subiecteBacController');

const requireAuth = require('../middleware/requireAuth')

const router = express.Router();

// router.get('/viewClass/:classId', viewClass);

router.use(requireAuth);

router.post('/createSubiectBac', createSubiectBac);

module.exports = router;