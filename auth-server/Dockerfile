# Use the official Node.js image as the base image
FROM node:lts-alpine3.21

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./
COPY tsconfig*.json ./

# Install app dependencies using the `npm ci` command
RUN npm ci

# Copy source files
COPY . .

# Build the app and log output
RUN npm run build

# Expose port
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/index.js"]