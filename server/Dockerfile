# Use an official Node.js runtime as a parent image
FROM node:latest

# Set the working directory in the container
WORKDIR /server

# Copy package.json and package-lock.json (or yarn.lock) files
COPY package*.json /server

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . /server

# Install any needed packages specified in package.json
RUN npm install

# Make port 3000 available to the world outside this container
EXPOSE 5000/tcp

# Define environment variable, if needed
ENV MONGO_URI="mongodb://mongo:27017/devices"

# The command to run your app using Node.js
CMD ["node", "server.js"]
