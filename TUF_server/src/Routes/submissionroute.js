const express = require('express');
const jwt = require("jsonwebtoken");
const { authMiddleware } = require('../Middlewares/authmiddleware');
const bodyParser = require('body-parser');
require('dotenv').config()
const submissionroute = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;
submissionroute.use(express.json());

submissionroute.use(bodyParser.json());
submissionroute.use(authMiddleware);
submissionroute.get('/' , (req , res)=>{

    const db = req.pool;
   db.query('SELECT * FROM submissions ORDER BY created_at DESC', (err, results) => {
    if (err) {
      console.error('Error retrieving submissions:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    // Return submissions as JSON response
    res.json(results);
  });

})

submissionroute.post('/postsubmission', (req, res) => {
    const submissionData = req.body;
    const db = req.pool;
    submissionData.status = JSON.stringify(submissionData.status);
  submissionData.language = JSON.stringify(submissionData.language);
  const authHeader = req.headers.authorization;
  const token = authHeader.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const email  = decoded.email;
    submissionData.email = email

  // Insert the submission data into the database
  db.query('INSERT INTO submissions SET ?', submissionData, (err, result) => {
    if (err) {
      console.error('Error inserting submission data:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    res.status(201).json({ message: 'Submission data stored successfully' });
  });
  });





module.exports = submissionroute;
