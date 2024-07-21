FROM node:lts-alpine as build


WORKDIR /app


COPY package*.json ./

RUN npm install


COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm","run", "start"] 

# Stage 2: Serve the built React app using Nginx
# FROM nginx:1.18.0-alpine

# Copy build artifacts from Stage 1
# COPY --from=build /app/build /usr/share/nginx/html

# Start Nginx server (automatically starts on container startup)
# CMD ["nginx", "-g", "daemon off;"]
