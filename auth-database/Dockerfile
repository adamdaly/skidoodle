# Use the official MongoDB image as the base
FROM mongo:latest

# Expose the default MongoDB port
EXPOSE 27017

# Set a volume for persistent data
VOLUME /data/db

# Copy an optional initialization script (if you need to seed data)
COPY ./init.js /docker-entrypoint-initdb.d/

# Default command is inherited from the mongo image (runs mongod)
CMD ["mongod"]