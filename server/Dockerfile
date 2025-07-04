
# Use the official Node.js image as the base image
FROM node:lts-alpine3.21

# Create app directory
WORKDIR /usr/src/app

ARG AWS_DB_URL
ENV DATABASE_URL=$AWS_DB_URL

ARG NEXT_PUBLIC_SERVER_URL
ENV NEXT_PUBLIC_SERVER_URL=$NEXT_PUBLIC_SERVER_URL
ARG COGNITO_CLIENT_ID
ENV COGNITO_CLIENT_ID=$COGNITO_CLIENT_ID
ARG COGNITO_USER_POOL_ID
ENV COGNITO_USER_POOL_ID=$COGNITO_USER_POOL_ID

COPY --chown=node:node . .
RUN npm install

RUN npx prisma generate --schema=./prisma/schema.prisma || (echo "Prisma generate failed" && exit 1)
RUN npm run build && [ -f dist/main.js ] || (echo "Build failed: dist/main.js not found" && exit 1)

# Use the node user from the image (instead of the root user)
USER node

EXPOSE 3000

CMD ["npm", "run", "start:prod"]      