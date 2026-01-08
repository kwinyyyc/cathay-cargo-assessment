# Cathay Assessment Project

A full-stack microservices application for Cathay Cargo.

## Project Overview

This project consists of three main components:
- **Flight API** - Spring Boot microservice for flight information
- **Agent API** - Spring Boot microservice for agent management with JWT authentication
- **Corp Site** - Next.js frontend application with DaisyUI

## Project Structure

```
.
├── docker-compose.yml              # Docker Compose configuration
├── src/packages/
│   ├── flight-api/                 # Flight API microservice
│   │   ├── src/                    # Source code
│   │   ├── pom.xml                 # Maven configuration
│   │   ├── Dockerfile              # Docker image definition
│   │   └── README.md               # Flight API documentation
│   ├── agent-api/                  # Agent API microservice
│   │   ├── src/                    # Source code
│   │   ├── pom.xml                 # Maven configuration
│   │   ├── Dockerfile               # Docker image definition
│   │   └── README.md               # Agent API documentation
│   └── corp-site/                  # Next.js frontend
│       ├── app/                    # Next.js app directory
│       ├── package.json            # Node.js dependencies
│       ├── Dockerfile              # Docker image definition
│       └── README.md               # Frontend documentation
└── README.md                       # This file
```

## Architecture

### Microservices

1. **Flight API** (`flight-api`)
   - Port: `8080`
   - Database: PostgreSQL (`flightdb`)
   - Features: Flight search, CRUD operations
   - Authentication: None (public API)

2. **Agent API** (`agent-api`)
   - Port: `8081`
   - Database: PostgreSQL (`agentdb`)
   - Features: Agent search with filters, pagination
   - Authentication: JWT with Cognito integration [Not implemented]

3. **Corp Site** (`corp-site`)
   - Port: `3000`
   - Features: Flight status UI, Agent management UI, Cognito authentication

### Databases

- **PostgreSQL (Flight)**: Port `5432`
- **PostgreSQL (Agent)**: Port `5433`

## Prerequisites

- **Docker** and **Docker Compose** (recommended)
- **Java 21** (for local backend development)
- **Maven 3.9+** (for local backend development)
- **Node.js 20+** (for local frontend development)
- **pnpm 10.x** or **npm** (for frontend package management)

## Quick Start with Docker Compose

The easiest way to run the entire application:

```bash
# Build and start all services
docker-compose up --build

# Or run in detached mode
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

This will start:
- **PostgreSQL (Flight)** on port `5432`
- **PostgreSQL (Agent)** on port `5433`
- **Flight API** on port `8080`
- **Agent API** on port `8081`
- **Corp Site** on port `3000`

### Access the Applications

- **Frontend**: http://localhost:3000
- **Flight API**: http://localhost:8080/api/flights
- **Agent API**: http://localhost:8081/api/agents (requires authentication) [Login not implemented in this demo]