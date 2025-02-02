# # Fetching the latest node image on apline linux
# FROM node:alpine AS builder

# # Declaring env
# ENV NODE_ENV production

# # Setting up the work directory
# WORKDIR /app

# # Installing dependencies
# COPY ./package.json ./
# RUN npm install

# # Copying all the files in our project
# COPY . .

# # Building our application
# RUN npm run build

# # Fetching the latest nginx image on apline linux
# FROM nginx

# # Copying built assets from builder
# COPY --from=builder /app/build /usr/share/nginx/html

# # Copying our nginx.conf
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Fetch the latest Node.js image
FROM node:alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy all frontend files
COPY . .

# Build the React app
RUN npm run build

# Use Nginx to serve the frontend
FROM nginx

# Copy built assets to Nginx HTML folder
COPY --from=builder /app/build /usr/share/nginx/html

# Copy Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for web access
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
