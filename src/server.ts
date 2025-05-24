import express, { Express } from "express";
import transactionRoutes from "@/routes/transactionRoutes";
import dotenv from "dotenv";
import { checkDatabaseConnection } from "./config/db";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/transactions", transactionRoutes);

// Start server only after checking database connection
const startServer = async () => {
  try {
    await checkDatabaseConnection();
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();