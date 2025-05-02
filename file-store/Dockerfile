# Use the official Node.js image as the base image
FROM node:lts-alpine3.21

# Create app directory
WORKDIR /usr/src/app


# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# Copying this first prevents re-running npm install on every code change.
COPY --chown=node:node package*.json ./
COPY --chown=node:node tsconfig*.json ./

RUN npm install

# Bundle app source
COPY --chown=node:node . .

# Create the frames directory and set ownership
RUN mkdir -p /usr/src/app/frames && chown node:node /usr/src/app/frames

RUN npm run build

# Use the node user from the image (instead of the root user)
USER node

EXPOSE 3000

CMD ["npm", "start"]