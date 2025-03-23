# Use Node.js as base image
FROM node:18

# Set working directory
WORKDIR /client

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy project files (excluding node_modules and artifacts which will be mounted)
COPY . .

# Ensure the artifacts directory exists
RUN mkdir -p /client/src/artifacts

# Set environment variables for development
ENV NODE_ENV=development
ENV WDS_SOCKET_PORT=0

# Expose port for React app
EXPOSE 3000

# Start React app in development mode
CMD ["npm", "start"]