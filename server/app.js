const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const errorHandler = require("./middlewares/error.middleware");
const authRouter = require("./modules/auth/auth.routes");
const userRouter = require("./modules/users/user.routes");

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  }),
);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: "Too many requests, please try again later." },
});
app.use("/api/", limiter);

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

const version = process.env.APP_VERSION || "v1";
const baseUrl = `/api/${version}`;

app.use(`${baseUrl}/auth`, authRouter);
app.use(`${baseUrl}/user`, userRouter);

app.use(errorHandler);

module.exports = app;
