const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 8000;

app.use(bodyParser.json());
app.use(cors());

const users = [];

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    res.json({ success: true, message: 'Login successful' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid username or password' });
  }
});

app.post('/register', (req, res) => {
  const { firstname, lastname, email, password, height, weight } = req.body;

  const user = {
    username: email, 
    firstname,
    lastname,
    email,
    password,
    height,
    weight
  };

 
  users.push(user);

  const { password: _, ...userData } = user;
  res.json({ success: true, user: userData });
});

app.get('/users', (req, res) => {
  res.status(200).json(users);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
