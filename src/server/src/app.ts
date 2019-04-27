import express from "express";
import compression from "compression";  // compresses requests
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import passport from "passport";
import expressValidator from "express-validator";
import bluebird from "bluebird";
import { MONGODB_URI, JWT_SECRET } from "./util/secrets";
import jwt from "express-jwt";
import cors from "cors";

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: ".env.example" });

// Controllers (route handlers)
import * as userController from "./controllers/user";
import * as roomController from "./controllers/room";

// Create Express server
const app = express();

// Connect to MongoDB
const mongoUrl = MONGODB_URI;
(<any>mongoose).Promise = bluebird;
mongoose.connect(mongoUrl, {useMongoClient: true}).then(
  () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
).catch(err => {
  console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
  // process.exit();
});

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(compression());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

// Authentication
const auth = jwt({
  secret: JWT_SECRET,
  userProperty: "payload"
});

/**
 * Primary app routes.
 */
app.get("/", auth, (req, res, next) => {
  res.send("HELLO WORLD");
});
app.post("/login", userController.postLogin);
app.post("/signup", userController.postSignup);
app.get("/room", auth, roomController.getAllRooms);
app.post("/room", auth, roomController.postRoom);
app.get("/room/:id", auth, roomController.getRoomByID);
app.post("/room/:id/invite", auth, roomController.inviteMembers);

export default app;
