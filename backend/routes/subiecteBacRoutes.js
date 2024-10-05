const express = require('express');
const{
    createSubiectBac,
    getSubiectBac
} = require('../controllers/subiecteBacController');

const requireAuth = require('../middleware/requireAuth')

const router = express.Router();

router.get('/getSubiectBac/:subId', getSubiectBac);

router.use(requireAuth);

router.post('/createSubiectBac', createSubiectBac);

module.exports = router;