require("dotenv").config();
const express = require("express");
const { userRouter } = require("./src/controller/userController");
const taskRouter = require("./src/controller/taskController");
const { successResponse } = require("./src/middleware/responseStructure");
const { errorHandler } = require("./src/middleware/errorHandler");
const connectDB = require("./src/utils/db");
const cors = require('cors')

const app = express();
const port = parseInt(process.env.port, 10) || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", userRouter);
app.use("/tasks", taskRouter);

app.use(successResponse);
app.use(errorHandler);

app.listen(port, () => {
  connectDB();
  console.log(`Example app listening on port ${port}`);
});
