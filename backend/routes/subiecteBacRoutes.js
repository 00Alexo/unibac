const express = require('express');
const{
    createSubiectBac,
    getSubiectBac,
    getSubiecteByUser,
    getSubiecteMaterie
} = require('../controllers/subiecteBacController');

const requireAuth = require('../middleware/requireAuth')

const router = express.Router();

router.get('/getSubiecteByUser', getSubiecteByUser)
router.get('/getSubiectBac/:subId', getSubiectBac);
router.get('/getSubiecteMaterie/:materie', getSubiecteMaterie);

router.use(requireAuth);

router.post('/createSubiectBac', createSubiectBac);

module.exports = router;