# ️ Microservices Backend Test - Order System
This project is a technical test for Backend Developer candidates. It
simulates a distributed system using microservices architecture with
asynchronous communication via RabbitMQ.
---
## 📦 Services Overview
| Service | Description|
|----------------------|---------------------------------------------------------------|
| `auth-service` | JWT Security, Rate Limitter, Validator, and API Gateway |
| `order-service` | Exposes an API to create orders and publishes `order.created` |
| `inventory-service` | Listens to `order.created`, checks stock, and updates it |
| `notification-service`| Logs a success message when inventory is updated |
---
## 🚀 Tech Stack
- Node.js + TypeScript
- NestJS
- RabbitMQ (message broker)
- Docker & Docker Compose
- No Database
---
## 🐳 Running the Application (via Docker)
### 1. **Prerequisites**
- Docker & Docker Compose installed
- Ports `5672`, `15672` (RabbitMQ), `3000` for services should be free
### 2. **Clone the Repository**
```bash
git clone
https://github.com/Ammarfar/nestjs-microservice-order-app
cd nestjs-microservice-order-app
docker-compose up --build
```
### 3 Open API Documentation
- Access Swagger documentation through `http://localhost:3000/api/docs`
### 4. Static Data for Testing
- Includes hard-coded test data used during development; no database records are involved.
```javascript
// USERS
{
  userId: 1,
  username: 'john',
  password: 'doe',
},
{
  userId: 2,
  username: 'jane',
  password: 'doe',
},

// ITEMS
{
  itemId: 1,
  itemName: 'Item 1',
  stock: 10,
},
{
  itemId: 2,
  itemName: 'Item 2',
  stock: 5,
},
