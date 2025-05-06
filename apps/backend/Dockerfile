# Use Node.js LTS version
FROM node:20-alpine

# Create app directory
WORKDIR /app

# Install OpenSSL for Prisma
RUN apk add --no-cache openssl

# Create uploads directory and set permissions
RUN mkdir -p /app/uploads && chown -R node:node /app/uploads && chmod 777 /app/uploads

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy Prisma schema
COPY prisma ./prisma/

# Generate Prisma Client
RUN npx prisma generate

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Copy entrypoint script
COPY docker-entrypoint.sh .
RUN chmod +x docker-entrypoint.sh

# Switch to non-root user
USER node

# Expose the port the app runs on
EXPOSE 3000

# Use the entrypoint script
ENTRYPOINT ["./docker-entrypoint.sh"] 