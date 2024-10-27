FROM node:18-alpine AS builder
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app's files
COPY . .

# Build the Vite app for production
RUN npm run build

# Use a minimal server image for serving the app
FROM nginx:alpine

# Copy the build output to the nginx html folder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx config from root dir
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the port the app runs on
EXPOSE 80

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]
