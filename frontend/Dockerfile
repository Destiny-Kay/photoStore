# Use an official Node.js image with Alpine Linux
FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock (or package-lock.json if using npm)
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn

# Copy the rest of the application code
COPY . .

# Expose the port Vite runs on (default is 5173)
EXPOSE 5173

# Start the Vite development server
CMD ["yarn", "dev", "--host"]
