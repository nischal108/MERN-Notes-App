const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const notesRoutes = require('./notesRoutes');

// Redirect requests to /user to userRoutes
router.use('/user', userRoutes);

// Redirect requests to /notes to notesRoutes
router.use('/notes', notesRoutes);

module.exports = router;
