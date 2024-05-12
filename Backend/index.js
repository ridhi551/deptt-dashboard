const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const pdfUploadRoutes = require("./routes/pdfUploadRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
var cors = require("cors");

// Connect db
dotenv.config();
connectDB();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/pdfUpload", pdfUploadRoutes);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/login", async function (req, res) {
  res.send("Logged in ");
});

app.use(notFound);
app.use(errorHandler);

const Port = process.env.PORT || 5000;
app.listen(Port, console.log("Server started on port 5000 "));
