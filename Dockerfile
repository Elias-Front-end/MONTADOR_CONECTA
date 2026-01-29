# Multi-stage build for smaller image size

# Stage 1: Build Frontend Assets
FROM node:20-alpine AS frontend
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Install PHP Dependencies
FROM composer:latest AS composer
WORKDIR /app
COPY composer.* ./
# Install system dependencies for Composer
RUN apk add --no-cache git unzip
RUN composer install --no-dev --no-scripts --no-autoloader --prefer-dist --ignore-platform-reqs
COPY . .
RUN composer dump-autoload --optimize --no-scripts

# Stage 3: Final Production Image
FROM php:8.2-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    nginx \
    supervisor \
    zip \
    unzip \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    curl \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip opcache \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /var/www

# Copy PHP dependencies from composer stage
COPY --from=composer /app/vendor /var/www/vendor
COPY --from=composer /app /var/www

# Copy Frontend assets from frontend stage
COPY --from=frontend /app/public/build /var/www/public/build
COPY --from=frontend /app/public/build/manifest.json /var/www/public/build/manifest.json

# Copy Configuration Files
COPY docker/nginx/default.conf /etc/nginx/sites-available/default
COPY docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY docker/entrypoint.sh /usr/local/bin/start-container

# Configure Permissions
RUN chmod +x /usr/local/bin/start-container \
    && chown -R www-data:www-data /var/www \
    && chmod -R 755 /var/www/storage

# Expose Port
EXPOSE 80

# Define Entrypoint
ENTRYPOINT ["start-container"]
