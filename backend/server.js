require("dotenv").config();
const express = require("express");
const { userRouter } = require("./src/controller/userController");
const taskRouter = require("./src/controller/taskController");
const { successResponse } = require("./src/middleware/responseStructure");
const { errorHandler } = require("./src/middleware/errorHandler");
const connectDB = require("./src/utils/db");
const cors = require('cors');

const app = express();
const port = parseInt(process.env.port, 10) || 3000;


app.use(cors({
  origin: 'https://profound-sawine-1fef06.netlify.app', // your Netlify frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true, // if using cookies or auth headers
}));


app.options('*', cors({
  origin: 'https://profound-sawine-1fef06.netlify.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", userRouter);
app.use("/tasks", taskRouter);

app.use(successResponse);
app.use(errorHandler);

app.listen(port, () => {
  connectDB();
  console.log(`Server listening on port ${port} `);
});