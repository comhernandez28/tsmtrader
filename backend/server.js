const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const port = process.env.PORT || 8000;

connectDB();

const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/tsm', require('./routes/tsmRoutes'));

//Error Middleware
app.use(errorHandler);

app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});
