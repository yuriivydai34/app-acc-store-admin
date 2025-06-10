FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies and NestJS CLI
RUN npm install -g @nestjs/cli
RUN npm install

# Copy source code
COPY . .

# Debug: List contents before build
RUN ls -la

# Build the application
RUN npm run build

# Debug: List contents after build
RUN ls -la dist/
RUN find dist -type f

# Production stage
FROM node:20-alpine

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm install --only=production

# Copy the entire dist directory
COPY --from=builder /usr/src/app/dist ./dist

# Create uploads directory with proper permissions
RUN mkdir -p uploads && chmod 777 uploads

# Copy tsconfig.json
COPY --from=builder /usr/src/app/tsconfig.json ./

# Debug: List contents of dist directory
RUN ls -la dist/
RUN find dist -type f

EXPOSE 3000

# Use node directly to run the built application
CMD ["sh", "-c", "ls -la dist/ && node dist/src/main.js"] 