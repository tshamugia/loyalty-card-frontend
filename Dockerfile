FROM node:lts-alpine as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Serve the built React app using Nginx
FROM nginx:1.18.0-alpine

# Copy build artifacts from Stage 1
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 3000
# Start Nginx server (automatically starts on container startup)
CMD ["nginx", "-g", "daemon off;"]
