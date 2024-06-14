const express = require('express');
const  {createPost,allPosts} = require('../controller/content');
const authentication = require('../middleware/authentication');

const contentRouter = express.Router();
contentRouter.post('/',authentication ,createPost);

contentRouter.get('/',authentication,allPosts);

module.exports = contentRouter;