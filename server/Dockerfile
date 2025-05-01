# Use the official Node.js image as the base image
FROM node:lts-alpine3.21

# Set the working directory inside the container
WORKDIR /usr/src/app

COPY --chown=node:node package.json ./
COPY --chown=node:node tsconfig*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the NestJS application
RUN npx prisma generate
RUN npm run build

# Expose the application port
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "start:prod"]