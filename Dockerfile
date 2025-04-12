# Stage 1: Build
FROM node:22-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source files
COPY . .

# Build the Vite project
RUN npm run build

# Stage 2: Serve with a lightweight HTTP server
FROM nginx:alpine

# Copy built files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx config (optional)
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose port (default Vite build is static files, usually served on port 80)
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
