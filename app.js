// Import the required modules
import express from "express";
import morgan from "morgan";

import userRouter from "./routes/users.js";
import gameRouter from "./routes/games.js";

// Initialize the express app
const app = express();

// Middleware
app.use(morgan("dev")); // Morgan is used for logging HTTP requests to the console in a developer-friendly format
app.use(express.json()); // express.json() middleware is used to parse incoming JSON requests

// Use sub-routers
app.use("/users", userRouter);
app.use("/games", gameRouter);

export default app;