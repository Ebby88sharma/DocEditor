const express = require('express');
const { getDocs, createDoc, getDocByID, updateDoc, deleteDoc } = require('../controllers/docController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();


router.route('/').get(protect, getDocs);
router.route('/create').post(protect, createDoc);
router.route('/:id').get(getDocByID).put(protect,updateDoc).delete(protect,deleteDoc);

module.exports = router;