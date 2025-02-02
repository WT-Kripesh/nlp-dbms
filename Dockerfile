# ================================
# Step 1: Build React Frontend
# ================================
FROM node:alpine AS frontend-builder

# Set working directory
WORKDIR /app/frontend

# Install frontend dependencies
COPY ./Frontend/package.json ./Frontend/package-lock.json ./
RUN npm install

# Copy all frontend files and build React app
COPY ./Frontend ./
RUN npm run build

# ================================
# Step 2: Set Up MySQL Database
# ================================
FROM mysql:8.0 AS database

# Set environment variables for MySQL
ENV MYSQL_ROOT_PASSWORD=rootpassword
ENV MYSQL_DATABASE=default_db

# Copy SQL files for database initialization
COPY ./Backend/demo/ /docker-entrypoint-initdb.d/

# Expose MySQL port
EXPOSE 3306

# ================================
# Step 3: Set Up Python Backend
# ================================
FROM python:3.9 AS backend

# Set working directory
WORKDIR /app/backend

# Install backend dependencies
COPY ./Backend/requirements.txt .
RUN pip install -r requirements.txt

# Copy backend files
COPY ./Backend .

# Copy built frontend files into backend's static folder
COPY --from=frontend-builder /app/frontend/build ./static

# Expose ports (React on 3000, Flask on 3001)
EXPOSE 3000 3001

# ================================
# Step 4: Run Everything
# ================================
CMD service mysql start && python app.py & cd ../frontend && npm start
