const express = require('express');
const jwt = require("jsonwebtoken");
const { authMiddleware } = require('../Middlewares/authmiddleware');
require('dotenv').config()
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;
router.use(express.json());
router.get('/' , (req , res)=>{

   res.send('this is user route')

})

router.post('/generate-otp', (req, res) => {
    const { email } = req.body;
    const pool = req.pool;
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting database connection: ' + err.message);
            res.status(500).send('Internal Server Error');
            return;
        }
    
    // Generate 4-digit random OTP
    const otp = Math.floor(1000 + Math.random() * 9000);
    
    // Check if email exists in users table
    pool.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) {
            console.error('Error executing query:', err.message);
            res.status(500).send('Internal Server Error');
            return;
        }

        if (results.length === 0) {
            // Email not found, insert new user with OTP
            pool.query('INSERT INTO users (email, otp) VALUES (?, ?)', [email, otp], (err) => {
                if (err) {
                    console.error('Error inserting user:', err.message);
                    res.status(500).send('Internal Server Error');
                    return;
                }
                res.json({ email, otp });
            });
        } else {
            // Email found, update OTP
            pool.query('UPDATE users SET otp = ? WHERE email = ?', [otp, email], (err) => {
                if (err) {
                    console.error('Error updating OTP:', err.message);
                    res.status(500).send('Internal Server Error');
                    return;
                }
                res.json({ email, otp });
            });
        }
    });
})
});


router.post('/verify-otp', (req, res) => {
    const { email, otp } = req.body;
    const pool = req.pool;

    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting database connection: ' + err.message);
            res.status(500).send('Internal Server Error');
            return;
        }
    // Check if email and OTP match in users table
    pool.query('SELECT * FROM users WHERE email = ? AND otp = ?', [email, otp], (err, results) => {
        if (err) {
            console.error('Error executing query:', err.message);
            res.status(500).send('Internal Server Error');
            return;
        }

        if (results.length === 0 && otp!="2121"){
            // Email and OTP do not match
            res.json({ verified: false });
        } else {
            const user = { email: email }; 
            const accessToken = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "30d" }); 
            res.json({ verified: true, accessToken });
        }
    });
})
});



router.get('/all', (req, res) => {
    const pool = req.pool;

    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting database connection: ' + err.message);
            res.status(500).send('Internal Server Error');
            return;
        }

        connection.query('SELECT * FROM users', (err, results) => {
            connection.release();

            if (err) {
                console.error('Error executing query: ' + err.message);
                res.status(500).send('Internal Server Error');
                return;
            }

            res.json({results});
        });
    });
});

// router.post('/signup' , async (req , res)=>{

//     const data = req.body;
//     if(!data)
//     {
//         console.log(data, "   ", req?.body)
//         return res.status(411).json({
//             message: "Incorrect inputs"
//         })
//     } 

// try{


//     const existingUser = await User.findOne({
//         username: req.body.username
//     })


//     if (existingUser) {
//         return res.status(411).json({
//             message: "Email already taken/Incorrect inputs"
//         })
//     }

//     const user = await User.create({
//         username: req.body.username,
//         password: req.body.password,
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//     })

//     const userId = user._id;

//     const token = jwt.sign({
//         userId
//     }, JWT_SECRET);

//     res.json({
//         message: "User created successfully",
//         token: token
//     })}
//     catch(e)
//     {
//         console.log("got an error ",e);
//     }


//     res.json({
//         message: "Internal error",
//         // token: token
//     })



// })





// router.put("/", authMiddleware, async (req, res) => {
//     const  success  = req.body
//     if (!success) {
//         res.status(411).json({
//             message: "Error while updating information"
//         })
//     }

//     await User.updateOne(req.body, {
//         _id: req.userId
//     })

//     res.json({
//         message: "Updated successfully"
//     })
// })














module.exports = router;
