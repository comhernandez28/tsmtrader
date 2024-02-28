const express = require('express');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');

const port = process.env.PORT || 3000;

const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
app.use('/api/user', require('./routes/userRoutes'));

//Error Middleware
app.use(errorHandler);

app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});
