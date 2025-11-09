const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  ConflictError,
  UnauthorizedError,
  NotFoundError,
  BadRequest,
} = require("../utils/customErrorHandler");
const User = require("../models/userSchema");
const BlacklistedToken = require("../models/blackListTokenSchema.js");

module.exports.register = async (req, res, next) => {
  const { email, name, password } = req.body;

  if (!email) {
    throw new BadRequest("Email is required");
  }

  if (!name) {
    throw new BadRequest("Name is required");
  }

  if (!password) {
    throw new BadRequest("Password is required");
  }

  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) {
    throw new ConflictError("User Already Exists");
  }

  const hashedPassword = await bcrypt.hash(
    req.body.password,
    parseInt(process.env.SALT_ROUNDS, 10)
  );

  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  await newUser.save();

  res.locals.status = 201;
  res.locals.message = "User Created Successfully";
  res.locals.data = {
    name: req.body.name,
    email: req.body.email,
  };
  next();
};

module.exports.login = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email }).select(
    "+password"
  );
  if (!user) {
    throw new NotFoundError("Email is not registered!");
  }

  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) {
    throw new UnauthorizedError("Invalid Credentials");
  }

  const payload = {
    id: user._id,
    name: user.name,
  };

  const accessToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: parseInt(process.env.EXPIRES_IN, 10),
  });

  res.locals.status = 200;
  res.locals.message = "User Logged In Successfully";
  res.locals.data = { token: accessToken };
  next();
};

module.exports.getUserProfile = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    throw new NotFoundError("User not found");
  }

  res.locals.status = 200;
  res.locals.message = "User fetched successfully";
  res.locals.data = user;
  next();
};

module.exports.logout = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) throw new Error("Token missing");

  const decoded = jwt.decode(token);
  const expiresAt = new Date(decoded.exp * 1000);

  const blacklistedToken = new BlacklistedToken({
    token,
    userId: req.user.id,
    expiresAt,
  });

  await blacklistedToken.save();

  res.locals.status = 200;
  res.locals.message = "User logged out successfully";
  res.locals.data = null;
  next();
};
