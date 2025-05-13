# API Documentation

## Overview

The Telos Protocol API provides endpoints for interacting with the platform's features, including authentication, Web3 operations, neural assessment, and challenge management.

## Base URL

```
https://api.telosprotocol.com/v1
```

## Authentication

All API requests require authentication using JWT tokens.

### Headers

```
Authorization: Bearer <token>
```

### Endpoints

#### Register User

```http
POST /auth/register
```

Request body:
```json
{
  "email": "user@example.com",
  "password": "securepassword",
  "username": "username"
}
```

Response:
```json
{
  "token": "jwt_token",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "username": "username"
  }
}
```

#### Login

```http
POST /auth/login
```

Request body:
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

Response:
```json
{
  "token": "jwt_token",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "username": "username"
  }
}
```

## Web3 Operations

### Get Token Balance

```http
GET /web3/balance
```

Response:
```json
{
  "balance": "1000.00",
  "staked": "500.00",
  "rewards": "50.00"
}
```

### Stake Tokens

```http
POST /web3/stake
```

Request body:
```json
{
  "amount": "100.00",
  "duration": "30"
}
```

Response:
```json
{
  "success": true,
  "transactionHash": "0x...",
  "stakeId": "stake_id"
}
```

### Unstake Tokens

```http
POST /web3/unstake
```

Request body:
```json
{
  "stakeId": "stake_id"
}
```

Response:
```json
{
  "success": true,
  "transactionHash": "0x...",
  "amount": "100.00"
}
```

### Get Staking History

```http
GET /web3/staking-history
```

Response:
```json
{
  "history": [
    {
      "stakeId": "stake_id",
      "amount": "100.00",
      "startDate": "2024-03-20T00:00:00Z",
      "endDate": "2024-04-20T00:00:00Z",
      "rewards": "10.00"
    }
  ]
}
```

## Neural Assessment

### Perform Assessment

```http
POST /neural/assess
```

Request body:
```json
{
  "digitalBehavior": [
    {
      "type": "productive",
      "duration": 3600,
      "focusLevel": 8
    }
  ],
  "emotionalResponses": [
    {
      "intensity": 5,
      "recoveryTime": 300,
      "awareness": 8
    }
  ],
  "attentionMetrics": [
    {
      "duration": 1800,
      "sustainedFocus": 7,
      "selectiveFocus": 8
    }
  ],
  "decisionPatterns": [
    {
      "type": "rational",
      "planned": true
    }
  ]
}
```

Response:
```json
{
  "neuralMetrics": {
    "pfcActivation": 75,
    "amygdalaRegulation": 80,
    "defaultModeNetwork": 70,
    "executiveFunction": 75,
    "emotionalRegulation": 80,
    "attentionControl": 75
  },
  "pathwayMap": {
    "cognitiveControl": {
      "strength": 75,
      "connections": {
        "executiveFunction": 75,
        "attentionControl": 75
      }
    }
  },
  "vulnerabilities": [
    {
      "area": "Default Mode Network",
      "description": "Reduced default mode network activity",
      "impact": "May affect self-reflection and introspection",
      "recommendations": [
        "Practice mindfulness meditation",
        "Engage in journaling"
      ]
    }
  ],
  "recommendations": {
    "shortTerm": [
      "Practice mindfulness meditation",
      "Engage in journaling"
    ],
    "mediumTerm": [
      "Implement a daily cognitive training routine"
    ],
    "longTerm": [
      "Establish a regular mindfulness practice"
    ]
  }
}
```

### Get Assessment History

```http
GET /neural/history
```

Response:
```json
{
  "history": [
    {
      "date": "2024-03-20T00:00:00Z",
      "metrics": {
        "pfcActivation": 75,
        "amygdalaRegulation": 80
      },
      "recommendations": [
        "Practice mindfulness meditation"
      ]
    }
  ]
}
```

## Challenge Management

### Create Challenge

```http
POST /web3/challenges
```

Request body:
```json
{
  "challengeType": "mindfulness",
  "duration": 7,
  "stakeAmount": "50.00"
}
```

Response:
```json
{
  "challengeId": "challenge_id",
  "transactionHash": "0x..."
}
```

### Get User Challenges

```http
GET /web3/challenges
```

Response:
```json
{
  "challenges": [
    {
      "challengeId": "challenge_id",
      "type": "mindfulness",
      "startDate": "2024-03-20T00:00:00Z",
      "endDate": "2024-03-27T00:00:00Z",
      "stakeAmount": "50.00",
      "status": "active"
    }
  ]
}
```

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request

```json
{
  "error": "Invalid request parameters",
  "details": "Detailed error message"
}
```

### 401 Unauthorized

```json
{
  "error": "Unauthorized",
  "message": "Invalid or expired token"
}
```

### 403 Forbidden

```json
{
  "error": "Forbidden",
  "message": "Insufficient permissions"
}
```

### 404 Not Found

```json
{
  "error": "Not Found",
  "message": "Resource not found"
}
```

### 500 Internal Server Error

```json
{
  "error": "Internal Server Error",
  "message": "An unexpected error occurred"
}
```

## Rate Limiting

API requests are limited to:
- 100 requests per minute for authenticated users
- 20 requests per minute for unauthenticated users

Rate limit headers are included in all responses:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 1616284800
```

## WebSocket API

The WebSocket API provides real-time updates for various events.

### Connection

```
wss://api.telosprotocol.com/v1/ws
```

### Authentication

Send authentication message after connection:
```json
{
  "type": "auth",
  "token": "jwt_token"
}
```

### Events

#### Neural Assessment Updates

```json
{
  "type": "neural_assessment",
  "data": {
    "metrics": {
      "pfcActivation": 75,
      "amygdalaRegulation": 80
    }
  }
}
```

#### Challenge Updates

```json
{
  "type": "challenge_update",
  "data": {
    "challengeId": "challenge_id",
    "status": "completed",
    "reward": "50.00"
  }
}
```

#### Staking Updates

```json
{
  "type": "staking_update",
  "data": {
    "stakeId": "stake_id",
    "rewards": "10.00"
  }
}
``` 