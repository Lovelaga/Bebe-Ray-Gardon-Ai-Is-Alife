# Stage 1: Build the Application
# We use node:18-alpine as the base for building and installing dependencies.
# Alpine is much smaller (~150MB vs ~900MB for node:18)
FROM node:18-alpine AS build

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first to leverage Docker caching.
# If these files don't change, subsequent builds can skip 'npm install'.
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Stage 2: Create the Final Production Image
# We use node:18-alpine as the runtime image for a smaller footprint
FROM node:18-alpine

# Set the working directory
WORKDIR /usr/src/app

# Install dumb-init to handle signals properly (recommended for Alpine)
RUN apk add --no-cache dumb-init

# Copy the node_modules and built application files from the 'build' stage
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/package*.json ./
COPY --from=build /usr/src/app .

# Expose the port your app runs on
ENV PORT=8080
EXPOSE $PORT

# Health check - monitors if the application is running
# Adjust the path/port if your health endpoint is different
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080/ || exit 1

# Run the application using the non-root user (recommended for security)
USER node

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Define the command to start your application
CMD [ "node", "index.js" ]
