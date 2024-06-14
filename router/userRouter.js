const express = require('express');
const  { register,login, getUser } = require('../controller/user');
const authentication = require('../middleware/authentication');

const userRouter = express.Router();
userRouter.post('/register',register);
userRouter.post('/login',login);
userRouter.get('/getUser',authentication,getUser);


module.exports = userRouter;