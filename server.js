const express = require("express");
const connectDb = require("./config/dbConnection");
const cookieParser = require("cookie-parser");
const cors = require("cors");

require("dotenv").config();

const userRouter = require("./routes/userRoutes")
const dataFetch = require("./routes/dataFetch")
const securityTrails = require("./routes/securityTrails")

const PORT = process.env.PORT || 9001;

connectDb();

const app = express();
const corsOptions = {
    origin: ["http://localhost:3000", "http://localhost:5173","http://localhost:3001"], // Replace with your frontend domain
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    // allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    optionsSuccessStatus: 200,
  };

app.use(express.json({ limit: '50mb' }));


app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Welcome to Osint API");
  });
app.use("/api", userRouter);
app.use("/api/data", dataFetch);
app.use("/api/securitytrails", securityTrails);


app.listen(PORT, () => {
    console.log("------------------------------------------------");
    console.log(`Project name: ${process.env.PROJECT}`);
    console.log(`Hosted by: ${process.env.COMPANY}`);
    console.log(`Developer of the Project: ${process.env.DEVELOPER}`);
    console.log(`${process.env.PROJECT} backend server started`);
    console.log(`Status: Running`);
    console.log(`Listening to Port: ${PORT}`);
    console.log("-----------------------------------------------");
  });