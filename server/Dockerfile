# Use the official Node.js image as the base image
FROM node:lts-alpine3.21

# Set the working directory inside the container
WORKDIR /usr/src/app

COPY --chown=node:node package.json ./
COPY --chown=node:node tsconfig*.json ./
COPY --chown=node:node prisma ./prisma

# Install the application dependencies
RUN npm install

# Copy the rest of the application files
COPY --chown=node:node . .

# Build the NestJS application
# RUN npx prisma generate || (echo "Prisma generate failed" && exit 1)
# RUN npm run build && [ -f dist/main.js ] || (echo "Build failed: dist/main.js not found" && exit 1)

# Ensure permissions
# RUN chown -R node:node /usr/src/app/dist

# Expose the application port
EXPOSE 3000

USER node

# Command to run the application
# CMD ["npm", "run", "start:prod"]
CMD ["tail", "-f", "/dev/null"]