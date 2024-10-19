const express = require('express');
const{
    createSubiectBac,
    getSubiectBac,
    getSubiecteMaterie
} = require('../controllers/subiecteBacController');

const requireAuth = require('../middleware/requireAuth')

const router = express.Router();

router.get('/getSubiectBac/:subId', getSubiectBac);
router.get('/getSubiecteMaterie/:materie', getSubiecteMaterie);

router.use(requireAuth);

router.post('/createSubiectBac', createSubiectBac);

module.exports = router;