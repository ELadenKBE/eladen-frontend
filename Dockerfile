# Use the official Node.js 16.4 image as the base image
FROM node:16.4

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container's working directory
COPY package*.json ./

# Install the application dependencies specified in package.json
RUN npm install

# Copy all the files and directories from the current directory to the container's working directory
COPY . .

# Build the react app
RUN npm run build

# Expose port 5000 to allow incoming traffic to the container
EXPOSE 5000

# Define the command to run when the container starts
# It uses npx to run the 'serve' package, serving the 'dist' directory on port 5000
CMD [ "npx", "serve", "-s", "dist", "-l", "5000" ]
