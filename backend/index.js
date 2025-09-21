import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import ConnectDb from "./src/config/db.js";

// import routes 
import employeeRouter from "./src/routes/employee.routes.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// todo routes here
 
app.use("/api/v1/employee", employeeRouter);

app.get("/", (req, res) => {
  res.send("server is running ✅ ...");
});

app.listen(port, () => {
  ConnectDb();
  console.log(`server is running on http://localhost:${port}`);
});
