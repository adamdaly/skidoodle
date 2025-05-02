
# Use the official Node.js image as the base image
FROM node:lts-alpine3.21

# Create app directory
WORKDIR /usr/src/app

COPY --chown=node:node . .
RUN npm install

RUN npx prisma generate --schema=./prisma/schema.prisma || (echo "Prisma generate failed" && exit 1)
RUN npm run build && [ -f dist/main.js ] || (echo "Build failed: dist/main.js not found" && exit 1)

RUN npm run build

# Use the node user from the image (instead of the root user)
USER node

EXPOSE 3000

CMD ["npm", "run", "start:prod"]      