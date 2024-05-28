# Use an official Node.js runtime as a parent image
FROM node:latest AS builder

# Set the working directory in the container
WORKDIR /client

# Copy package.json and package-lock.json (or yarn.lock) files
COPY package*.json /client

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . /client

# Build the React application
RUN npm install
# RUN npm install -g serve
RUN npm run build

# Make port 5000 available to the world outside this container
# EXPOSE 3000/tcp

# Command to run the app
# CMD ["serve", "-s", "build"]

# Production stage
FROM nginx:latest
COPY --from=builder /client/build /usr/share/nginx/html
EXPOSE 80/tcp
CMD ["nginx", "-g", "daemon off;"]