# Stage 1: Build Angular app with Node.js
FROM node:18-alpine AS build

# Set working directory
WORKDIR /usr/local/app

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy all project files
COPY . .

# Build the Angular app
RUN ng build --configuration=production --output-path=./dist/india-centre-fd

# Stage 2: Serve app with Nginx
FROM nginx:stable-alpine AS production-stage

# Copy the built Angular app to Nginx server
COPY --from=build /usr/local/app/dist/india-centre-fd /usr/share/nginx/html/

# Optionally, copy a custom Nginx configuration file
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for web traffic
EXPOSE 80
