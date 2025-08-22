# Redis Configuration for Seasons Systems

This directory contains the Redis configuration for the Seasons Systems application. Redis is used for:

- Real-time chat functionality
- Session management
- Caching
- Real-time notifications for Seasons Planner

## Configuration Details

The Redis instance is configured with:

- Persistence enabled (AOF mode)
- Memory limit of 512MB with LRU eviction
- Optimized for real-time operations
- Keyspace notifications enabled for real-time features
- Connection limit of 10,000 clients

## Environment Variables

Required environment variables:
- `REDIS_PASSWORD`: Password for Redis authentication

## Usage

Redis is configured in the main docker-compose.yml file. The service will automatically:
1. Use the custom configuration from redis.conf
2. Persist data to a named volume
3. Expose port 6379
4. Implement health checks

## Health Checks

The Redis service includes health checks that verify:
- The service is running
- Authentication is working
- The service can accept connections

## Monitoring

Redis metrics can be monitored through:
- Redis INFO command
- Redis MONITOR command
- Container health checks
- Docker stats
