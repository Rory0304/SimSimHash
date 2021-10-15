FROM node:latest as builder

# Work directory
WORKDIR /usr/src/app

# Copy the source file
COPY . .

# Install the library
RUN ["/usr/local/bin/npm",  "install"]
RUN ["/usr/local/bin/npm", "run",  "build"]

# From make nginx image
FROM nginx:latest

# Copy the nginx conf files
COPY nginx/nginx.conf /etc/nginx
COPY nginx/7team-frontend.conf /etc/nginx/sites-available/7team-frontend.conf
RUN ln -s /etc/nginx/sites-available /etc/nginx/sites-enabled

WORKDIR /app
COPY --from=builder /usr/src/app/build /app/build

CMD ["nginx", "-g", "daemon off;"]
