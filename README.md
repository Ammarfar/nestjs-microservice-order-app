# ️ Microservices Backend Test - Order System

This project is a technical test for Backend Developer candidates. It
simulates a distributed system using microservices architecture with
asynchronous communication via RabbitMQ.

---

## 📦 Services Overview

| Service                | Description                                                   |
| ---------------------- | ------------------------------------------------------------- |
| `auth-service`         | JWT Security, Rate Limitter, Validator, and API Gateway       |
| `order-service`        | Exposes an API to create orders and publishes `order.created` |
| `inventory-service`    | Listens to `order.created`, checks stock, and updates it      |
| `notification-service` | Logs a success message when inventory is updated              |

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
```

---

## 🚀 Improvement Plan

#### Retry Mechanism with DLX/DLQ + Poison Queue & Redis Idempotency:

- `Problem`: One of the services down, queue keep growing but insufficient prefetch/consumers, event failed to proceed, and while retrying there is duplicated message like causing stock deducted twice.
- `Solution`: Implemented a robust message retry workflow using Dead Letter Exchange/Queue and poison queue handling for inspection, combined with Redis-based idempotency to ensure messages are processed exactly once and prevent duplicate side effects.

#### Transactional Outbox Pattern for RabbitMQ Downtime:

- `Problem`: Rabbitmq suddenly down after order API successfully create order on DB, so publish service fails and make the event not delivered/lost, inconsistent state (order created but inventory never checked).
- `Solution`: Integrated the transactional outbox pattern to guarantee reliable event publishing. Events are stored in a local outbox table within the same order creation database transaction, then safely forwarded to RabbitMQ when the broker becomes available using background Worker, preventing message loss.

#### Circuit Breaker Implementation:

- `Problem`: 3rd-party service down or keep failing or returning slower response by time because of higher traffic.
- `Solution`: This is for my education purpose. For example, if the inventory service needs to call 3rd-party/client service to check the stock, then I need to implemented a circuit breaker to isolate failures from unstable 3rd-party services, reduce cascading latency over time, and enable fast-fail behavior while dependencies are unavailable.

#### SAGA Pattern with Pub/Sub Event Choreography to Avoid Partial Failures:

- `Problem`: Inventory deducted but order status update fails causing paradox system (distributed transaction/separate local transactions in each service).
- `Solution`: Designed a distributed SAGA using event-driven pub/sub choreography, ensuring each service publishes compensation or completion events. This prevents inconsistent states during multi-service workflows and improves overall fault tolerance.
