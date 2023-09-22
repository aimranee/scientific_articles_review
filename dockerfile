# Use an official Node.js runtime as the base image for both the src and backend
FROM node:18 AS frontend

# Set the working directory for the src
WORKDIR /PAPER_CHECKER/src

# Copy package.json and package-lock.json for the src
COPY src/package*.json ./

# Install src application dependencies
RUN npm install

# Copy the src application code to the container
COPY src ./

# Build the src
RUN npm run build

# Build the backend
FROM node:18 AS backend

# Set the working directory for the backend
WORKDIR /PAPER_CHECKER/backend

# Copy package.json and package-lock.json for the backend
COPY backend/package*.json ./

# Install backend application dependencies
RUN npm install

# Copy the backend application code to the container
COPY backend ./

# Expose the port that the backend server will listen on
EXPOSE 8080

# Start the backend server using nodemon
CMD [ "npx", "nodemon", "server.js" ]

# Create a final image that combines both src and backend
FROM node:18

# Set the working directory for the final image
WORKDIR /PAPER_CHECKER

# Copy the built src files from the "frontend" stage
COPY --from=frontend /PAPER_CHECKER/src/build ./src/build

# Copy the built backend files from the "backend" stage
COPY --from=backend /PAPER_CHECKER/backend ./

# Expose the port that the Next.js src will listen on
EXPOSE 3000

# Define the command to start your Next.js application
# CMD [ "npm", "run", "dev" ]
CMD [ "npm", "run", "start" ]