

## 🏗️ Architecture

### Tech Stack
- **Frontend**: React + Vite, Tailwind CSS, shadcn/ui, Axios, React Router
- **Backend**: Node.js + Express, Sequelize (PostgreSQL), Redis
- **AI**: Ollama (Docker)
- **DevOps**: Docker Compose, Environment Variables

### Project Structure
```
seasons-systems/
├── backend/          # Express API, Sequelize models, Redis integration
├── frontend/         # React app, Tailwind CSS, components
├── ai/              # Ollama AI service (Docker)
├── docker-compose.yaml # Orchestrates all services
└── README.md         # This file
```

## 🛠️ Setup & Installation

### Prerequisites
- Node.js 20.19+ or 22.12+
- Docker and Docker Compose
- Git

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd seasons-systems
   ```

2. **Set up environment variables**
   ```bash
   # Backend
   cp backend/.env.example backend/.env
   # Edit backend/.env with your configuration
   ```

3. **Start all services**
   ```bash
   docker-compose up --build
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:4000
   - Database: localhost:5432
   - Redis: localhost:6379
   - Ollama AI: localhost:11434

### Manual Setup (Development)

#### Backend
```bash
cd backend
npm install
# Create .env file with your configuration
npx sequelize-cli db:migrate
npm run dev
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 📊 Database Schema

The system includes comprehensive tables for:
- **Crops**: Planting, harvest, yield tracking
- **Livestock**: Animal management, health monitoring
- **Fields & Pens**: Land and enclosure management
- **Equipment**: Tools, machinery, maintenance
- **Inventory**: Stock management, pricing
- **Sales**: Transaction tracking, analytics
- **Suppliers**: Vendor management
- **Employees**: Staff records, roles, departments
- **Resupply**: Procurement requests, orders

## 🔐 Authentication & Security

- JWT-based authentication with 1-day token expiry
- Password hashing using bcrypt
- Role-based access control (Admin, User, Super Admin)
- Audit logging for compliance and traceability
- CORS configuration for secure API access

## 🎨 UI/UX Features

- **Responsive Design** with Tailwind CSS
- **Custom Color Palette**: Green, Orange, White theme
- **Navigation**: Left sidebar with department-specific tabs
- **Dashboard**: Role-based content and analytics
- **Toast Notifications**: Real-time updates and alerts

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/login` - User login

### Core Entities
- `GET/POST/PUT/DELETE /api/employees` - Employee management
- `GET/POST/PUT/DELETE /api/crops` - Crop management
- `GET/POST/PUT/DELETE /api/livestock` - Livestock management
- `GET/POST/PUT/DELETE /api/fields` - Field management
- `GET/POST/PUT/DELETE /api/equipment` - Equipment management
- `GET/POST/PUT/DELETE /api/inventory` - Inventory management
- `GET/POST/PUT/DELETE /api/sales` - Sales management
- `GET/POST/PUT/DELETE /api/suppliers` - Supplier management

## 🚀 Development

### Running Tests
```bash
# Backend
cd backend
npm test

# Frontend
cd frontend
npm test
```

### Code Quality
- ESLint configuration for code standards
- Prettier for consistent formatting
- TypeScript support (optional)

### Database Migrations
```bash
cd backend
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 🤝 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the API documentation in `API_DOCS.md`
