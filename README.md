# Money Manager API

A RESTful API built with Express.js, TypeScript, and PostgreSQL using Drizzle ORM for managing transactions.

## Features

- CRUD operations for financial transactions
- Type-safe database operations with Drizzle ORM
- Environment-based configuration
- Input validation and error handling

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL database
- TypeScript knowledge

## Project Structure

```
├── src/
│   ├── config/
│   │   ├── db.ts         # Database configuration
│   │   └── env.ts        # Environment variables configuration
│   ├── controllers/
│   │   └── transactionController.ts
│   ├── models/
│   │   └── TransactionModel.ts
│   ├── routes/
│   │   └── transactionRoutes.ts
│   ├── schema/
│   │   └── transactionSchema.ts
│   ├── types/
│   │   └── transaction.ts
│   └── server.ts         # Main application file
├── .env                  # Environment variables
├── .gitignore
├── drizzle.config.ts    # Drizzle ORM configuration
├── package.json
└── tsconfig.json
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following content:
   ```
   DATABASE_URL=postgres://username:password@localhost:5432/database_name
   PORT=3000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Transactions

- **GET** `/api/transactions` - Get all transactions
- **GET** `/api/transactions/:id` - Get a specific transaction
- **POST** `/api/transactions` - Create a new transaction
  ```json
  {
    "description": "Grocery shopping",
    "amount": 50.75,
    "type": "expense"
  }
  ```
- **PUT** `/api/transactions/:id` - Update a transaction
- **DELETE** `/api/transactions/:id` - Delete a transaction

## Data Types

### Transaction
```typescript
{
  id: number;          // Auto-generated
  description: string; // Required
  amount: number;      // Required
  type: "income" | "expense"; // Required
  createdAt: Date;     // Auto-generated
}
```

## Error Handling

The API uses standard HTTP status codes and returns error messages in the following format:

```json
{
  "error": "Error message here"
}
```

Common error codes:
- 400: Bad Request (invalid input)
- 404: Not Found
- 500: Internal Server Error

## Development

### Database Migrations

Using Drizzle Kit for database migrations:

```bash
# Generate migration
npx drizzle-kit generate:pg

# Push migration to database
npx drizzle-kit push:pg
```

### Environment Variables

- `DATABASE_URL`: PostgreSQL connection string
- `PORT`: Server port (default: 3000)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.
