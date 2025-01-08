const express = require('express');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
 
const app = express();
const PORT = 3001;
const JWT_SECRET = 'yoyo';
 
// Middleware
app.use(bodyParser.json());
app.use(cors());
 
// Read the db.json file
const getUsers = () => {
  const data = fs.readFileSync('../user.json', 'utf-8');
  return JSON.parse(data).users;
};
 
const getGroceries = () => {
  const data = fs.readFileSync('../grocery.json', 'utf-8');
  return JSON.parse(data).groceryData;
};
//console.log(getGroceries())

// Login Route
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
 
  const users = getUsers();
 
  const user = users.find((u) => u.email === email && u.password === password);
 
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
 
  const { password: _, ...userWithoutPassword } = user;
 
  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
 
  res.json({
    result: true,
    user: userWithoutPassword,
    token,
  });
});
 
// Protected Route (Example)
app.get('/api/getGrocery', (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  //console.log(getGroceries())
 
  if (!token) return res.status(401).json({ message: 'Token not provided' });
 
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token is invalid or expired' });
    res.json({ res: getGroceries() });
    //console.log(getUsers());
  });
});
 
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
 