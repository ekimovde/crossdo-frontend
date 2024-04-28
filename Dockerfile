# Set the base image
FROM node:20-alpine

# Enable PNPM package manager
RUN corepack enable
RUN corepack prepare pnpm@8.7.6 --activate

WORKDIR /app

ENV VITE_API_HOST=""

# Install dependencies
COPY package.json ./
COPY pnpm-lock.yaml ./
RUN pnpm install

# Copy the rest of the files and build the app
COPY . .
RUN pnpm build

# Serve the app
CMD ["pnpm", "preview"]

# Expose port
EXPOSE 3000
