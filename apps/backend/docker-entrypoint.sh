#!/bin/sh

# Wait for the database to be ready
echo "Waiting for database to be ready..."
sleep 10

# Ensure uploads directory exists and has correct permissions
echo "Setting up uploads directory..."
mkdir -p /app/uploads
chown -R node:node /app/uploads
chmod 755 /app/uploads

# Run database migrations
echo "Running database migrations..."
npx prisma migrate deploy

# Start the application
echo "Starting the application..."
exec npm run start:prod 