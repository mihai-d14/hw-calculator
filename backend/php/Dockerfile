# backend/php/Dockerfile
FROM php:8.2-alpine

WORKDIR /var/www/html

# Install required PHP extensions
RUN docker-php-ext-install opcache

# Copy PHP configuration
COPY php.ini /usr/local/etc/php/conf.d/app.ini

# Copy application code
COPY . .

# Expose port 3003
EXPOSE 3003

# Start PHP built-in server
CMD ["php", "-S", "0.0.0.0:3003"]