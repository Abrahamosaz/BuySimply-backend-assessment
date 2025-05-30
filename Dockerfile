# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:18-alpine As runner

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy built application from builder stage
COPY --from=builder /app/build ./build

# Create a startup script with proper line endings and permissions
RUN echo '#!/bin/sh' > /app/start.sh && \
    echo 'npm run migration:run' >> /app/start.sh && \
    echo 'npm run seed' >> /app/start.sh && \
    echo 'node build/main' >> /app/start.sh && \
    chmod +x /app/start.sh

# Start the application using the startup script
CMD ["/app/start.sh"]
