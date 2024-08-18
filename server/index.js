require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./DB/DBConnect');
const allRoutes = require('./routes/allRoutes');

const app = express();

// Connect to database
connectDB();

// Middleware
const allowedOrigins = ['http://localhost:5173', 'https://mern-notes-app-rose.vercel.app'];

// Configure CORS
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(express.json());

// Routes
app.use('/api/v1', allRoutes);

app.get('/',(req,res)=>{
  res.send("hello world");
})

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});