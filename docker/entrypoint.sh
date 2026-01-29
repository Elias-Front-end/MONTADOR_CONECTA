#!/bin/sh

# Set correct permissions
chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

# Run package discovery (since we skipped it in build)
php artisan package:discover

# Run Laravel optimizations
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Run migrations (Safe for production if you want auto-migrate)
php artisan migrate --force

# Start Supervisor (which starts Nginx and PHP-FPM)
exec /usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf
