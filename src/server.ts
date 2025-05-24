import express, { Express } from "express";
import transactionRoutes from "@/routes/transactionRoutes";
import dotenv from "dotenv";
import { db, checkDatabaseConnection } from "./config/db";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/transactions", transactionRoutes);

// Check database connection
checkDatabaseConnection();

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});