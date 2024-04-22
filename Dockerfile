
FROM node:20.10.0-alpine3.18 AS base

FROM base AS appbuild

WORKDIR /usr/app

COPY . .

# Copy package.json and package-lock.json (or npm.lock)
RUN npm config set strict-ssl false
RUN npm install
RUN npm run build

# This build takes the build
FROM nginx:alpine

WORKDIR /usr/app

COPY --from=appbuild /usr/app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 3000

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]