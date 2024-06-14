const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const app = express();
const PORT = 8000;
const userRouter= require('./router/userRouter');
const contentRouter = require('./router/contentRouter')
app.use(bodyParser.json());
app.use(cors());
 
try{
  mongoose.connect('mongodb+srv://pp3662504:Prakash%4012@cluster0.kztmo7u.mongodb.net/dietback')
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.log('Error:',error.message));
}
catch(error){
  console.log('Error:',error.message);
}

app.use('/api/user',userRouter)
app.use('/api/content',contentRouter)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
