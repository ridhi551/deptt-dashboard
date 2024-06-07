const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const pdfUploadRoutes = require("./routes/pdfUploadRoutes");
const TeacherRoutes = require("./routes/TeacherRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const path = require("path");
var cors = require("cors");

// Connect db
dotenv.config();
connectDB();
app.use(express.json());
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:4000",
  process.env.HOST_URL,
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 204,
  credentials: true, // Allow credentials like cookies
};
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/pdfUpload", pdfUploadRoutes);
app.use("/api/v1/teacher", TeacherRoutes);

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
app.use(express.static(path.join(__dirname, "..", "client", "dist")));
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"), (err) => {
    if (err) {
      console.error("Error sending file:", err);
    }
  });
});
app.use(notFound);
app.use(errorHandler);

const Port = process.env.PORT || 5000;
app.listen(Port, console.log("Server started on port 5000 "));
