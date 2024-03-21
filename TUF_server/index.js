const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const rootrouter = require("./src/Routes");
const mysql = require('mysql');
const app = express()




const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

app.use((req, res, next) => {
  req.pool = pool;
  next();
});
app.use(cors())
app.use("/api/v1", rootrouter)

app.use(express.json());










app.get('/' , (req , res)=>{
   res.send('hello from simple server :)')
})




app.listen(2525,()=>{
    console.log("listening")
})





const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'anuragma807@gmail.com',
      pass: 'qdgcydiuuqieryny',
    },
  });
  var htmlContent = `<!DOCTYPE html>
  <html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f2f2f2;
        padding: 20px;
      }
      .container {
        background-color: #ffffff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      h1 {
        color: #007acc;
      }
      p {
        color: #444;
      }
      .cta-button {
        background-color: #007acc;
        color: #ffffff;
        text-decoration: none;
        padding: 10px 20px;
        border-radius: 4px;
        display: inline-block;
      }
      .cta-button:hover {
        background-color: #005fa9;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Hello from Saathi</h1>
      <p>
        Hello,<br>
        You have been added to a trip by your friend.
        You can view/update the checklist by logging in to Saathi.
      </p>
      <p>
       
      </p>
      <a href="" class="cta-button">Open App</a>
    </div>
  </body>
  </html>
  `;
  var mailOptions = {
    from: 'anuragma807@gmail.com',
    to: 'gathavishesh@gmail.com',
    subject: 'Hello from Saathi!',
    // text: 'Hello your status for schalrship has been updated  Successfully.Now u can apply and avail the benefits of Scholarships',
    html: htmlContent
  };
  
 


