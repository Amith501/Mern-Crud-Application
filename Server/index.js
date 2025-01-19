const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const route = require("./routes/StudentRoute.js");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

// Environment variables
const PORT = process.env.PORT || 4000;
const MONGOURL = process.env.MONGO_URL;

if (!MONGOURL) {
  console.error("MONGO_URL is not defined in the environment variables.");
  process.exit(1);
}

// Database connection
mongoose
  .connect(MONGOURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("DB connected successfully.");
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("DB connection failed:", error.message);
    process.exit(1);
  });

// Routes
app.use("/api", route);
