import express, { Express } from "express";
import transactionRoutes from "@/routes/transactionRoutes";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/transactions", transactionRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});