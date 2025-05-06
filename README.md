# Bhumio Assignment

This is a monorepo project built with TypeScript, using pnpm as the package manager and Turborepo for managing the workspace.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (version 18 or higher)
- pnpm (version 9.0.0)
- PostgreSQL (for database)

## Getting Started

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd bhumio-assignment
   ```

2. **Environment Setup**
   Create a `.env` file in the backend directory by copying the `.env.example`:

   ```bash
   cp .env.example .env
   ```

   Then, update the environment variables in `.env` with your local configuration:

   - Set your database connection string
   - Configure JWT secret
   - Set other required environment variables

3. **Install dependencies**

   ```bash
   pnpm install
   ```

4. **Running the Application**

   The application consists of two main parts: frontend and backend. You'll need to run both services:

   a. **Start the Frontend**

   ```bash
   cd frontend
   pnpm run dev
   ```

   This will start the frontend development server, typically on port 3000.

   b. **Start the Backend**
   Open a new terminal window, then:

   ```bash
   cd backend
   pnpm run start:dev
   ```

   This will start the backend server, typically on port 3001.

   Note: You'll need to keep both terminal windows open to run the full application.

5. **Building the project**
   To build the project:
   ```bash
   pnpm build
   ```

## Available Scripts

### Frontend (in frontend directory)

- `pnpm run dev` - Start frontend development server
- `pnpm build` - Build the frontend
- `pnpm lint` - Run frontend linting
- `pnpm format` - Format frontend code

### Backend (in backend directory)

- `pnpm run start:dev` - Start backend development server with hot-reload
- `pnpm run start:prod` - Start backend production server
- `pnpm build` - Build the backend
- `pnpm lint` - Run backend linting
- `pnpm check-types` - Check TypeScript types

## Project Structure

This is a monorepo managed by Turborepo with the following main directories:

- `frontend/` - Contains the frontend application
- `backend/` - Contains the backend NestJS application

## Environment Variables

The following environment variables are required to run the project:

- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (development/production)
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret key for JWT token generation

## Google cloud keys
GOOGLE_CLOUD_PROJECT=Google cloud project id
GOOGLE_CLOUD_BUCKET=Google cloud bucket name

## Cloudinary Keys
CLOUDINARY_CLOUD_NAME = cloudinary key using which you want to generate the poster
CLOUDINARY_API_KEY = Api key provided by cloudinary
CLOUDINARY_API_SECRET = Api secret also provided bt cloudinary


## Contributing

1. Make sure your code is properly formatted using Prettier
2. Run type checking before committing
3. Ensure all tests pass
4. Update environment variables in `.env.example` if adding new ones

## License

[Add your license information here]
