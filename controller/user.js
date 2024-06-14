const User = require('../model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

exports.register= async(request,response) =>{
        const {name,email,password} = request.body;

        //check if user already exists or not
        const validUser = await User.findOne({email});

        if(validUser){
            return response.status(500).json({message:'user already exists',email});
        }

        try {
            
            const passwordHash = await bcrypt.hash(password,10);

            const newUser = new User({
                name,
                email,
                password:passwordHash
            })

            await newUser.save();
            const tranporter = nodemailer.createTransport({
                service:'gmail',
                auth:{
                    user:'pp3662504@gmail.com',
                    pass:'tqpg yfua ogzx psis'
                }
            })

            const message = {
                from:'pp3662504@mail.com',
                to:email,
                subject:'Register successfully',
                text:`${email} are successfully register the application `
            }

            tranporter.sendMail(message,(err,info) =>{
                if(err){
                    res.status(404).json({message:"something went Wrong,try again!"})
                }
                res.status(200).json({message:
                    "Email sent"+info.response
                })
            }
            )
            response.status(201).json({
                message:'user registed successfully and send email to registerd Emailid',
                newUser
            })

           
        } catch (error) {
            response.status(404).json({
                'Error':error.message
            })
        }


        
    }
    exports.login = async (req, res) => {
        const { email, password } = req.body;
      
        try {
          // Check if the user exists
          const validUser = await User.findOne({ email });
          if (!validUser) {
            return res.status(400).json({ message: 'User not found' });
          }
      
          // Compare passwords
          const isPasswordValid = await bcrypt.compare(password, validUser.password);
          if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials' });
          }
      
          // Generate JWT token
          const token = jwt.sign({ userId: validUser._id }, 'apple', { expiresIn: '1h' });
      
          // Return the token and user ID
          res.status(200).json({message:'user signed in', token,email: validUser.email,name:validUser.name });
        } catch (error) {
          res.status(500).json({ message: 'Server error', error: error.message });
        }
      };

exports.getUser = async (request,response) =>{
    try {
        //get the user id from the request
        const userId = request.userId;

        //get the user from the database
        const user = await User.findById(userId);

        //retrun the user
        response.json({message:'user retrieved',user});
    } catch (error) {
        response.status(500).json({error:error.message});
    }
}