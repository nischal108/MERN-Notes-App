require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./DB/DBConnect');
const allRoutes = require('./routes/allRoutes');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173'
}));
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