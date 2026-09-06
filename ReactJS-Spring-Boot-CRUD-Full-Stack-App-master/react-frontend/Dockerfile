# --- Build stage ---
# Node 16 is used because this project's react-scripts version (3.4.1)
# predates the OpenSSL changes in Node 17+, which otherwise break the build.
FROM node:16-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# --- Serve stage ---
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
