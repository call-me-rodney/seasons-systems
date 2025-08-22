# Seasons Systems Backend

## Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
# Postgres Database
DB_USER=seasons_user
DB_PASS=seasons_pass
DB_NAME=seasons_db
DB_HOST=postgres
DB_PORT=5432

# Redis
REDIS_HOST=redis
REDIS_PORT=6379

# JWT
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=1d

# Ollama AI
OLLAMA_HOST=ollama
OLLAMA_PORT=11434

# Server
NODE_ENV=development
PORT=4000
```

## Setup

1. Install dependencies: `npm install`
2. Create `.env` file with the variables above
3. Run migrations: `npx sequelize-cli db:migrate`
4. Start development server: `npm run dev`
5. Start production server: `npm start`

## API Endpoints

- `POST /api/auth/login` - User authentication
- `GET /api/employees` - Employee management
- `GET /api/crops` - Crop management
- `GET /api/livestock` - Livestock management
- `GET /api/fields` - Field management
- `GET /api/pens` - Pen management
- `GET /api/equipment` - Equipment management
- `GET /api/inventory` - Inventory management
- `GET /api/sales` - Sales management
- `GET /api/suppliers` - Supplier management
- `GET /api/resupplies` - Resupply management
