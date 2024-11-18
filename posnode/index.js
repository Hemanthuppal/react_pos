const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
// const multer = require('multer');


const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL connection setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Your MySQL username
  password: '', // Your MySQL password
  database: 'pos',
});

// Connect to the database
db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});


// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/'); 
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname);
//   },
// });

// const upload = multer({ storage });


// app.post('/products', upload.single('productImage'), (req, res) => {
//   const { barcode, stockQuantity, productName, productPrice, category, salesPrice, description } = req.body;
//   const productImage = req.file ? req.file.filename : null;

//   const query = `
//     INSERT INTO products (barcode, stock_quantity, product_name, product_price, category, sales_price, description, product_image)
//     VALUES (?, ?, ?, ?, ?, ?, ?, ?)
//   `;

//   db.query(query, [barcode, stockQuantity, productName, productPrice, category, salesPrice, description, productImage], (err, result) => {
//     if (err) {
//       console.error('Error adding product:', err);
//       res.status(500).send('Error adding product');
//     } else {
//       res.status(201).send('Product added successfully');
//     }
//   });
// });

// Endpoint to fetch all users
app.get('/users', (req, res) => {
  const query = 'SELECT * FROM users';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send('Error fetching users');
    } else {
      res.json(results);
    }
  });
});

// Endpoint to add a new user
app.post('/users', (req, res) => {
  const { name, email, password, role } = req.body;
  const query = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
  db.query(query, [name, email, password, role], (err, result) => {
    if (err) {
      res.status(500).send('Error adding user');
    } else {
      res.status(201).send('User added successfully');
    }
  });
});

// Endpoint to delete a user
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM users WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      res.status(500).send('Error deleting user');
    } else {
      res.status(200).send('User deleted successfully');
    }
  });
});


app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
    db.query(query, [email, password], (err, results) => {
      if (err) {
        res.status(500).send('Error during login');
      } else if (results.length > 0) {
        // If user is found, send back the user's role and other details
        const user = results[0];
        res.status(200).json({
          message: 'Login successful',
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
        });
      } else {
        // If no matching user is found, send an error response
        res.status(401).send('Invalid email or password');
      }
    });
  });


// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
