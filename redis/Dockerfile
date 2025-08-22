# Use the official Redis image as the base image
FROM redis:7.2-alpine

# Add Redis configuration
COPY redis.conf /usr/local/etc/redis/redis.conf

# Expose Redis port
EXPOSE 6379

# Start Redis with the custom configuration
CMD ["redis-server", "/usr/local/etc/redis/redis.conf"]
