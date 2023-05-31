# Pull the Node image from Docker Hub
FROM node:14-slim

# Set directory
WORKDIR /usr/app

# Copy package.json
COPY ./package.json ./

# Install React dependencies
RUN npm install && npm install react-bootstrap --save

# Copy rest of the code to container
COPY . .

# Expose 3000 port
EXPOSE 3000

# Run the React application
CMD [ "npm", "start" ]