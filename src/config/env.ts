import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  PORT: z.string().transform(Number).pipe(z.number().positive()),
});

const env = envSchema.parse(process.env);

export default env;