const express = require('express');
const router = express.Router();
const { getUserPortal, getAdminPortal } = require('../controllers/userController');
const auth = require('../middleware/auth');

router.get('/portal', auth, getUserPortal);
router.get('/admin-portal', auth, getAdminPortal);

module.exports = router;
