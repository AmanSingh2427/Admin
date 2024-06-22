const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
const multer = require('multer');
const path = require('path');
const sendEmail = require('./emailService');
const crypto = require('crypto');

const pool = new Pool({
  user: 'postgres',
  host: '192.168.1.6',
  database: 'php_training',
  password: 'mawai123',
  port: 5432,
});

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
}).single('image');

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



// Generate OTP
const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

// Middleware to check if the user is an admin
const checkAdminRole = (req, res, next) => {
  const token = req.headers['authorization'].split(' ')[1];
  const decoded = jwt.verify(token, 'your_secret_key');
  const userId = decoded.userId;

  pool.query('SELECT role FROM aman.users WHERE id = $1', [userId])
    .then((result) => {
      if (result.rows.length > 0 && result.rows[0].role === 'admin') {
        next(); // User is admin, proceed to the next middleware/route handler
      } else {
        res.status(403).json({ message: 'Access forbidden: Admins only' });
      }
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).send('Server error');
    });
};

// Example route that is protected by the admin role check middleware
app.get('/adminhome', checkAdminRole, (req, res) => {
  res.send('Welcome to the Admin Home Page');
});

// Other routes (signup, login, etc.) go here
app.post('/signup', (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).send({ message: err });
    }
    const { username, password, email, fullName, role } = req.body; // Added role
    const imagePath = req.file ? req.file.path : null;

    try {
      const existingUser = await pool.query('SELECT * FROM aman.users WHERE email = $1', [email]);
      if (existingUser.rows.length > 0) {
        return res.status(400).send({ message: 'Email already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await pool.query(
        'INSERT INTO aman.users (username, password, email, full_name, image, role) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', // Added role
        [username, hashedPassword, email, fullName, imagePath, role] // Added role
      );

      // Send email to the new user
      sendEmail(
        email,
        'Registration is under processing wait for some time to allow the admin to give access to login',
        `Hello ${fullName},\n\nYou have successfully registered with the username: ${username}, image address ${imagePath}, and your role is ${role}.`
      );

      // Send email to the admin for approval
      const adminEmail = 'thakuraman8630@gmail.com'; // Replace with the admin's email address
      sendEmail(
        adminEmail,
        'New User Registration Approval Needed',
        `Hello Admin,\n\nA new user has registered with the following details:\n\nUsername: ${username}\nFull Name: ${fullName}\nEmail: ${email}\nRole: ${role}\n\nPlease approve or reject this user.`
      );

      console.log('Registration email sent to:', email);
      console.log('Approval email sent to admin:', adminEmail);
      res.json(newUser.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });
});

// Fetch pending user registrations
app.get('/pending-registrations', checkAdminRole, async (req, res) => {
  try {
    const pendingUsers = await pool.query('SELECT id, username, email, full_name, image, role FROM aman.users WHERE approved = false');
    res.json(pendingUsers.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Approve user registration
app.post('/approve-user', checkAdminRole, async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await pool.query('SELECT email, full_name FROM aman.users WHERE id = $1', [userId]);
    if (user.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    await pool.query('UPDATE aman.users SET approved = true WHERE id = $1', [userId]);

    // Send email to the user about approval
    sendEmail(
      user.rows[0].email,
      'Registration Approved',
      `Hello ${user.rows[0].full_name},\n\nYour registration has been approved by the admin. You can now log in to your account.`
    );

    res.json({ message: 'User approved' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Reject user registration
app.post('/reject-user', checkAdminRole, async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await pool.query('SELECT email, full_name FROM aman.users WHERE id = $1', [userId]);
    if (user.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    await pool.query('DELETE FROM aman.users WHERE id = $1', [userId]);

    // Send email to the user about rejection
    sendEmail(
      user.rows[0].email,
      'Registration Rejected',
      `Hello ${user.rows[0].full_name},\n\nYour registration has been rejected by the admin. For further details, please contact support.`
    );

    res.json({ message: 'User rejected and deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await pool.query('SELECT * FROM aman.users WHERE username = $1', [username]);
    if (user.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const isValidPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    if (!user.rows[0].approved) {
      return res.status(403).json({ message: 'Your registration has not been approved by the admin yet.' });
    }

    const token = jwt.sign({ userId: user.rows[0].id }, 'your_secret_key');

    if (user.rows[0].role === 'admin') {
      return res.json({ 
        token, 
        userImage: user.rows[0].image,
        role: 'admin'
      });
    } else {
      return res.json({ 
        token, 
        userImage: user.rows[0].image,
        role: 'user'
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


// Get user details route
app.get('/user-details', async (req, res) => {
  try {
    const token = req.headers['authorization'].split(' ')[1];
    const decoded = jwt.verify(token, 'your_secret_key');
    const userId = decoded.userId;

    const user = await pool.query('SELECT username, email, full_name, image FROM aman.users WHERE id = $1', [userId]);

    if (user.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update profile route
app.post('/update-profile', (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error('File upload error:', err);
      return res.status(400).send({ message: err });
    }

    try {
      const token = req.headers['authorization'].split(' ')[1];
      const decoded = jwt.verify(token, 'your_secret_key');
      const userId = decoded.userId;

      const { username, email, fullName } = req.body;
      let imagePath = req.file ? req.file.path : null;

      // If no new image is provided, fetch the current image path from the database
      if (!imagePath) {
        const user = await pool.query('SELECT image FROM aman.users WHERE id = $1', [userId]);
        if (user.rows.length === 0) {
          return res.status(404).json({ message: 'User not found' });
        }
        imagePath = user.rows[0].image;
      }

      const updateQuery = `
        UPDATE aman.users 
        SET username = $1, email = $2, full_name = $3, image = $4
        WHERE id = $5 
        RETURNING *`;
      const queryParams = [username, email, fullName, imagePath, userId];

      const updatedUser = await pool.query(updateQuery, queryParams);

      sendEmail(
        email,
        'Profile Updated',
        `Hello ${fullName},\n\nYour profile has been updated successfully. Here are your new details:\n\nUsername: ${username}\nEmail: ${email}\nFull Name: ${fullName}`
      );

      console.log('Profile update email sent to:', email);
      res.json(updatedUser.rows[0]);
    } catch (err) {
      console.error('Database update error:', err.message);
      res.status(500).send('Server error');
    }
  });
});

// Forgot password route
app.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await pool.query('SELECT * FROM aman.users WHERE email = $1', [email]);
    if (user.rows.length === 0) {
      return res.status(400).json({ message: 'Email not found' });
    }

    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 15 * 60000); // OTP expires in 15 minutes

    await pool.query(
      'UPDATE aman.users SET otp = $1, otp_expires_at = $2 WHERE email = $3',
      [otp, expiresAt, email]
    );
    console.log(otp, expiresAt, email);

    sendEmail(
      email,
      'Password Reset OTP',
      `Your OTP for password reset is ${otp}. It will expire in 15 minutes.`
    );

    res.status(200).json({ message: 'OTP sent to your email', otp }); // Return the OTP to the client
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


// Verify OTP route
app.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await pool.query(
      'SELECT * FROM aman.users WHERE email = $1 AND otp = $2 AND otp_expires_at > NOW()',
      [email, otp]
    );

    if (user.rows.length === 0) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    // await pool.query('UPDATE aman.users SET otp = NULL, otp_expires_at = NULL WHERE email = $1', [email]);

    const token = jwt.sign({ userId: user.rows[0].id }, 'your_secret_key');

    res.status(200).json({ message: 'OTP verified', token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Reset password route
app.post('/reset-password', async (req, res) => {
  const { otp, newPassword } = req.body;
  const otp_val = otp;
  console.log(otp_val); // Check if the OTP value is logged correctly

  try {
    // Fetch the user based on the provided OTP
    const user = await pool.query('SELECT * FROM aman.users WHERE otp = $1', [otp_val]);
    console.log(user.rows); // Log the user data to check if it's fetched correctly

    if (user.rows.length === 0) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password in the database
    await pool.query('UPDATE aman.users SET password = $1 WHERE otp = $2', [hashedPassword, otp_val]);

    // Clear OTP and expiry in the database
    await pool.query('UPDATE aman.users SET otp = NULL, otp_expires_at = NULL WHERE otp = $1', [otp_val]);

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

const uploads = multer({ storage: storage });

//create new product by admin
app.post('/create-product', uploads.single('photo'), async (req, res) => {
  const { name, price, description } = req.body;
  const photo = req.file ? req.file.filename : null;

  try {
    const newProduct = await pool.query(
      'INSERT INTO aman.products (name, price, photo, description) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, price, photo, description]
    );
    res.json(newProduct.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

app.get('/products', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM aman.products');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).send('Server error');
  }
});

// Fetch a product by ID
app.get('/products/:id', async (req, res) => {
  const productId = req.params.id;
  try {
    const query = 'SELECT * FROM aman.products WHERE id = $1';
    const { rows } = await pool.query(query, [productId]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('Error fetching product:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update a product by ID
app.put('/products/:id', async (req, res) => {
  const productId = req.params.id;
  const { name, price, description, photo } = req.body;
  try {
    const query = 'UPDATE aman.products SET name = $1, price = $2, description = $3, photo = $4 WHERE id = $5 RETURNING *';
    const { rows } = await pool.query(query, [name, price, description, photo, productId]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete a product by ID
app.delete('/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM aman.products WHERE id = $1', [id]);
    res.status(200).send('Product deleted successfully!');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


app.get('/', (req, res) => {
  console.log('Home page');
  res.send('Home page');
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
