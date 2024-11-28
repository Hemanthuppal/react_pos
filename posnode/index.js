const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const bwipjs = require('bwip-js');




const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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

// Create uploads folder if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}



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




// Endpoint to fetch all categories
app.get('/categories', (req, res) => {
  const query = 'SELECT * FROM category';
  db.query(query, (err, results) => {
      if (err) {
          res.status(500).send('Error fetching categories');
      } else {
          res.json(results);
      }
  });
});


// Endpoint to fetch all products
app.get('/products', (req, res) => {
  const query = 'SELECT * FROM products';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send('Error fetching products');
    } else {
      res.json(results);
    }
  });
});


// Backend endpoint for searching products by name
app.get('/products', (req, res) => {
  const { search } = req.query;
  const query = search
    ? 'SELECT * FROM products WHERE productname LIKE ?'
    : 'SELECT * FROM products';
  
  db.query(query, [`%${search}%`], (err, results) => {
    if (err) {
      res.status(500).send('Error fetching products');
    } else {
      res.json(results);
    }
  });
});


// Endpoint to fetch a single product by ID
app.get('/products/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM products WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      res.status(500).send('Error fetching product');
    } else if (results.length === 0) {
      res.status(404).send('Product not found');
    } else {
      res.json(results[0]); // Return the product data
    }
  });
});


// Endpoint to fetch product by barcode
app.get('/product-by-barcode/:barcode', (req, res) => {
  const { barcode } = req.params;
  const query = 'SELECT * FROM products WHERE barcode = ?';
  db.query(query, [barcode], (err, results) => {
    if (err) {
      res.status(500).send('Error fetching product by barcode');
    } else if (results.length === 0) {
      res.status(404).send('Product not found');
    } else {
      res.json(results[0]); // Return the product data
    }
  });
});




// Endpoint to fetch all tax discounts
app.get('/taxdiscount', (req, res) => {
  const query = 'SELECT * FROM taxdiscount';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send('Error fetching tax discounts');
    } else {
      res.json(results);
    }
  });
});


app.get('/api/orders', (req, res) => {
  const query = `
    SELECT 
      invoice_id, 
      orderdate, 
      subtotal, 
      discount, 
      sgst, 
      cgst, 
      total, 
      payment_type AS payment_type, 
      due, 
      paid 
    FROM orderdetails
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching orders:', err);
      return res.status(500).json({ message: 'Failed to fetch orders. Please try again later.' });
    }

    res.status(200).json(results); // Send the results as JSON
  });
});


app.get('/generate-barcode/:id', (req, res) => {
  const { id } = req.params;

  // Log the received id to check if it's correct
  console.log("Received ID:", id);

  if (!id || isNaN(id)) {
    return res.status(400).send('Invalid or missing product ID');
  }

  const query = 'SELECT barcode FROM products WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).send('Error fetching barcode');
    }

    if (results.length === 0) {
      return res.status(404).send('Product not found');
    }

    const barcode = String(results[0].barcode); // Ensure barcode is a string
    bwipjs.toBuffer(
      {
        bcid: 'code128',
        text: barcode,
        scale: 3,
        height: 10,
        includetext: true,
        textxalign: 'center',
      },
      (err, png) => {
        if (err) {
          console.error('Error generating barcode:', err);
          return res.status(500).send('Error generating barcode');
        } else {
          res.setHeader('Content-Type', 'image/png');
          res.send(png);
        }
      }
    );
  });
});





// Fetch product details by scanned barcode
app.get('/product-by-barcode/:barcode', (req, res) => {
  const { barcode } = req.params;

  const query = 'SELECT * FROM products WHERE barcode = ?';
  db.query(query, [barcode], (err, results) => {
    if (err) {
      res.status(500).send('Error fetching product');
    } else if (results.length === 0) {
      res.status(404).send('Product not found');
    } else {
      res.json(results[0]); // Return the product data
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

      // Multer configuration for file uploads
      const storage = multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, uploadsDir); // save the file to uploads folder
        },
        filename: (req, file, cb) => {
          cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
        },
      });

      const upload = multer({ storage });

      app.post('/add-product', upload.single('image'), (req, res) => {
        const { barcode, productName, category, description, stock, purchase, price } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : null; // Ensure the image path is set
      
        console.log('Received category:', category);  // Log to ensure category is received
      
        // Instead of category ID, we use category name directly
        const categoryName = category;  // The category name is sent from the frontend
      
        const query = `
          INSERT INTO products (barcode, productname, category, description, stock, purchase, price, image) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
      
        db.query(query, [barcode, productName, categoryName, description, stock, purchase, price, image], (err, result) => {
          if (err) {
            console.error('Error adding product:', err);
            res.status(500).send('Error adding product');
          } else {
            res.status(201).send('Product added successfully');
          }
        });
      });
      




// Endpoint to add a new category

app.post('/categories', (req, res) => {
  const { name } = req.body;
  const query = 'INSERT INTO category (name) VALUES (?)';
  db.query(query, [name], (err, result) => {
      if (err) {
          res.status(500).send('Error adding category');
      } else {
          res.status(201).send('Category added successfully');
      }
  });
});

let processingRequest = false; // Global flag

app.post('/save-order', (req, res) => {
  if (processingRequest) {
    return res.status(429).json({ message: 'Order processing. Please wait.' });
  }

  processingRequest = true; // Block new requests during execution

  const { total, paid, due, paymentType, products, orderDate, taxDiscount } = req.body;

  const subtotal = products.reduce((acc, product) => acc + product.total, 0);
  const discountAmount = (subtotal * taxDiscount.discount) / 100;
  const sgstAmount = (subtotal * taxDiscount.sgst) / 100;
  const cgstAmount = (subtotal * taxDiscount.cgst) / 100;

  const orderQuery = `
    INSERT INTO orderdetails (
      orderdate, subtotal, discount, sgst, cgst, total, paid, due, payment_type
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const orderValues = [orderDate, subtotal, discountAmount, sgstAmount, cgstAmount, total, paid, due, paymentType];

  db.query(orderQuery, orderValues, (err, result) => {
    if (err) {
      console.error('Error saving order:', err);
      processingRequest = false;
      return res.status(500).json({ message: 'Failed to save order. Please try again later.' });
    }

    const invoiceId = result.insertId;
    console.log('Inserted into orderdetails, invoiceId:', invoiceId);

    const productQueries = products.map((product) => {
      const productQuery = `
        INSERT INTO productdetails (
          invoice_id, barcode, product_id, product_name, qty, rate, saleprice, orderdate
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const productValues = [
        invoiceId, product.barcode, product.id, product.productname,
        product.qty, product.price, product.total, orderDate,
      ];

      return new Promise((resolve, reject) => {
        db.query(productQuery, productValues, (err) => {
          if (err) reject(err);
          else resolve();
        });
      });
    });

    Promise.all(productQueries)
      .then(() => {
        processingRequest = false;
        res.status(200).json({ message: 'Order saved successfully!', invoiceId });
      })
      .catch((err) => {
        processingRequest = false;
        console.error('Error saving products:', err);
        res.status(500).json({ message: 'Failed to save products. Please try again later.' });
      });
  });
});


// Endpoint to save product details
app.post('/save-productdetails', (req, res) => {
  const productDetails = req.body; // Expect an array of product details

  const query = `
    INSERT INTO productdetails (barcode, product_id, product_name, qty, rate, saleprice, orderdate)
    VALUES ?`;

  const values = productDetails.map(product => [
    product.barcode,
    product.product_id,
    product.product_name,
    product.qty,
    product.rate,
    product.saleprice,
    product.orderdate,
  ]);

  db.query(query, [values], (err, results) => {
    if (err) {
      console.error('Error saving product details:', err);
      res.status(500).send('Failed to save product details.');
    } else {
      res.status(201).send('Product details saved successfully.');
    }
  });
});



// Backend POST endpoint
app.post('/taxdiscount', (req, res) => {
  const { sgst, cgst, discount } = req.body;
  const query = 'INSERT INTO taxdiscount (sgst, cgst, discount) VALUES (?, ?, ?)';
  
  db.query(query, [sgst, cgst, discount], (err, result) => {
    if (err) {
      console.error('Error adding tax discount:', err);
      return res.status(500).send('Error adding tax discount');
    }
    
    // Send back the new record with the auto-generated ID
    const newTaxDiscount = {
      id: result.insertId,
      sgst,
      cgst,
      discount
    };
    
    res.status(201).json(newTaxDiscount); // Return the inserted record
  });
});


app.put('/products/:id', upload.single('image'), (req, res) => {
  const { id } = req.params;
  const { barcode, productname, category, description, stock, purchase, price } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  const query = image
      ? `
          UPDATE products 
          SET barcode = ?, productname = ?, category = ?, description = ?, stock = ?, purchase = ?, price = ?, image = ?
          WHERE id = ?
        `
      : `
          UPDATE products 
          SET barcode = ?, productname = ?, category = ?, description = ?, stock = ?, purchase = ?, price = ?
          WHERE id = ?
        `;

  const params = image
      ? [barcode, productname, category, description, stock, purchase, price, image, id]
      : [barcode, productname, category, description, stock, purchase, price, id];

  db.query(query, params, (err, result) => {
      if (err) {
          console.error('Error updating product:', err);
          res.status(500).send('Error updating product');
      } else if (result.affectedRows === 0) {
          res.status(404).send('Product not found');
      } else {
          res.status(200).send('Product updated successfully');
      }
  });
});





// Endpoint to update a category
app.put('/categories/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const query = 'UPDATE category SET name = ? WHERE id = ?';
  db.query(query, [name, id], (err, result) => {
    if (err) {
      res.status(500).send('Error updating category');
    } else if (result.affectedRows === 0) {
      res.status(404).send('Category not found');
    } else {
      res.status(200).send('Category updated successfully');
    }
  });
});



app.put('/taxdiscount/:id', (req, res) => {
  const { id } = req.params;
  const { sgst, cgst, discount } = req.body;

  const query = 'UPDATE taxdiscount SET sgst = ?, cgst = ?, discount = ? WHERE id = ?';
  db.query(query, [sgst, cgst, discount, id], (err, result) => {
    if (err) {
      res.status(500).send('Error updating tax discount');
    }
    if (result.affectedRows === 0) {
      res.status(404).send('Tax discount not found');
    }
    // Return the updated data
    res.status(200).json({ id, sgst, cgst, discount });
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


app.delete('/products/:id', (req, res) => {
  const { id } = req.params;
  // console.log(`Delete request received for ID: ${id}`); // Log ID received

  const query = 'DELETE FROM products WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting product:', err);
      res.status(500).send('Error deleting product');
    } else if (result.affectedRows === 0) {
      console.log(`No product found with ID: ${id}`);
      res.status(404).send('Product not found');
    } else {
      // console.log(`Product with ID ${id} deleted successfully`);
      res.status(200).send('Product deleted successfully');
    }
  });
});



// Endpoint to delete a category

app.delete('/categories/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM category WHERE id = ?';
  db.query(query, [id], (err, result) => {
      if (err) {
          res.status(500).send('Error deleting category');
      } else if (result.affectedRows === 0) {
          res.status(404).send('Category not found');
      } else {
          res.status(200).send('Category deleted successfully');
      }
  });
});



app.delete('/taxdiscount/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM taxdiscount WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      res.status(500).send('Error deleting tax discount');
    }
    if (result.affectedRows === 0) {
      res.status(404).send('Tax discount not found');
    }
    res.status(200).send('Tax discount deleted');
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
