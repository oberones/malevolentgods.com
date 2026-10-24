FROM node:24.22.1-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:1.31.8 AS runtime
COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
# Public assets can retain restrictive permissions from the build host.
RUN chmod -R a+rX /usr/share/nginx/html

# Run the master and workers without root; only runtime state needs write access.
RUN sed -i '/^user /d; s|^pid .*;|pid /tmp/nginx.pid;|' /etc/nginx/nginx.conf \
    && chown -R nginx:nginx /var/cache/nginx
USER nginx:nginx

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
