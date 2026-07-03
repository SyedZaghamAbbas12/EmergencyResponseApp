    const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const sosRoutes = require("./routes/sosRoutes");
const healthRoutes = require("./routes/healthRoutes");

const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);

app.use("/api/user", userRoutes);

app.use("/api/sos", sosRoutes);

app.use("/api/health", healthRoutes);

app.use(errorHandler);

module.exports = app;