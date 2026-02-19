import express from "express";
import router from "./routes/urlRoutes.js";
import dotenv from "dotenv";
dotenv.config({quiet: true});

const app = express();
const {BASE_URL, PORT} = process.env;

app.use(express.json());

app.use("/api", router); // prefixed endpoints with /api to clearly separate API endpoints from frontend routes.

app.listen(PORT, () => {
  console.log(`Server is running on ${BASE_URL}:${PORT}`);
});