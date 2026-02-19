import express from "express";
import apiRoutes from "./routes/api.routes.js";
import redirectRoutes from "./routes/redirect.routes.js"
import { connectToDatabase } from "./db.js";
import errorHandler from "./middleware/errorHandler.middleware.js";

const app = express();

const { NODE_ENV, PORT } = process.env;

app.use(express.json());

/*  Optional: rate limiting middleware to prevent abuse under high traffic
 for example: using express-rate-limit
 app.use(rateLimiter); */

app.use("/api", apiRoutes); // prefix endpoints with /api to clearly separate API endpoints from frontend routes.
app.use("/", redirectRoutes); // redirect requests so /:code works without /api prefix
app.use(errorHandler);

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

if (NODE_ENV !== "test") startServer();

export default app;