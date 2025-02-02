# Use an official Python image
FROM python:3.9

# Set the working directory
WORKDIR /app

# Copy the requirements file and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy all backend files
COPY . .

# Expose Flask port
EXPOSE 3001

# Start the Flask server
CMD ["python", "app.py"]
