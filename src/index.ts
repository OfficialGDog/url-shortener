import express from "express";
import router from "./routes/url.routes.js";
import { connectToDatabase } from "./db.js";

const app = express();

const { PORT } = process.env;

app.use(express.json());

app.use("/api", router); // prefixed endpoints with /api to clearly separate API endpoints from frontend routes.

async function startServer() {
  try {
    await connectToDatabase();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch(error) {
    console.log("Failed to start server:", error);
    process.exit(1);
  }
}

if (process.env.NODE_ENV !== "test") startServer();

export default app;