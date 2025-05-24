import express, { Express } from "express";
import transactionRoutes from "@/routes/transactionRoutes";
import dotenv from "dotenv";
import env from "@/config/env";

dotenv.config();

const app: Express = express();
const port = env.PORT;

app.use(express.json());
app.use("/api/transactions", transactionRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});