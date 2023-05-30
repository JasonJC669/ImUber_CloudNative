# Pull the Node image from Docker Hub
FROM node:14-slim

# Set directory
WORKDIR /usr/app

# Copy package.json
COPY ./package.json ./

# Install Express dependencies
RUN npm install

# Copy rest of the code to container
COPY . .

# Expose 3080 port
EXPOSE 3080

# Run the Express application
CMD [ "npm", "start" ]