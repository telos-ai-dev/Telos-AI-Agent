# Development Guide

## Getting Started

### Prerequisites

- Node.js (v16+)
- MongoDB
- MetaMask or Web3 wallet
- Git
- Docker (optional)
- VS Code (recommended)

### Development Environment Setup

1. Clone the repository:
```bash
git clone https://github.com/telosprotocol/telos-protocol.git
cd telos-protocol
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Start development server:
```bash
npm run dev
```

### Docker Setup

1. Build the Docker image:
```bash
docker build -t telos-protocol .
```

2. Run the container:
```bash
docker run -p 3000:3000 telos-protocol
```

## Project Structure

```
telos-protocol/
├── src/
│   ├── agents/           # Business logic agents
│   ├── config/           # Configuration files
│   ├── contracts/        # Smart contract ABIs
│   ├── middleware/       # Express middleware
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── services/        # Service layer
│   ├── utils/           # Utility functions
│   └── app.js           # Application entry point
├── tests/               # Test files
├── docs/               # Documentation
└── scripts/            # Build and deployment scripts
```

## Development Workflow

### 1. Code Style

We use ESLint and Prettier for code formatting. Configure your editor to use these tools:

```json
// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

### 2. Git Workflow

1. Create a new branch:
```bash
git checkout -b feature/your-feature
```

2. Make your changes

3. Commit your changes:
```bash
git add .
git commit -m "feat: add new feature"
```

4. Push your changes:
```bash
git push origin feature/your-feature
```

5. Create a pull request

### 3. Testing

Run tests:
```bash
# Run all tests
npm test

# Run specific test file
npm test -- path/to/test.js

# Run tests with coverage
npm run test:coverage
```

### 4. Smart Contract Development

1. Install Hardhat:
```bash
npm install --save-dev hardhat
```

2. Compile contracts:
```bash
npx hardhat compile
```

3. Run contract tests:
```bash
npx hardhat test
```

4. Deploy contracts:
```bash
npx hardhat run scripts/deploy.js --network <network>
```

## API Development

### 1. Creating New Routes

```javascript
// src/routes/example.js
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    // Your code here
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
```

### 2. Adding Middleware

```javascript
// src/middleware/auth.js
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Please authenticate' });
  }
};

module.exports = auth;
```

### 3. Creating Models

```javascript
// src/models/example.js
const mongoose = require('mongoose');

const exampleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Example', exampleSchema);
```

## Web3 Development

### 1. Smart Contract Interaction

```javascript
// src/services/web3.js
const { ethers } = require('ethers');
const contractABI = require('../contracts/TelosToken.json');

class Web3Service {
  constructor() {
    this.provider = new ethers.providers.Web3Provider(window.ethereum);
    this.signer = this.provider.getSigner();
    this.contract = new ethers.Contract(
      process.env.TELOS_TOKEN_ADDRESS,
      contractABI,
      this.signer
    );
  }

  async getBalance(address) {
    return await this.contract.balanceOf(address);
  }
}

module.exports = new Web3Service();
```

### 2. Event Handling

```javascript
// src/services/events.js
const { ethers } = require('ethers');

class EventService {
  constructor() {
    this.provider = new ethers.providers.Web3Provider(window.ethereum);
  }

  async listenToEvents(contract, eventName, callback) {
    contract.on(eventName, (...args) => {
      callback(args);
    });
  }
}

module.exports = new EventService();
```

## Neural Assessment Development

### 1. Creating Assessment Algorithms

```javascript
// src/services/neural.js
class NeuralService {
  async assessCognitiveState(userData) {
    const metrics = await this.calculateMetrics(userData);
    const pathwayMap = this.generatePathwayMap(metrics);
    const vulnerabilities = this.identifyVulnerabilities(metrics);
    const recommendations = this.generateRecommendations(metrics, vulnerabilities);

    return {
      metrics,
      pathwayMap,
      vulnerabilities,
      recommendations
    };
  }
}

module.exports = new NeuralService();
```

### 2. Training Module Development

```javascript
// src/services/training.js
class TrainingService {
  async createTrainingPlan(userProfile) {
    const exercises = await this.selectExercises(userProfile);
    const schedule = this.generateSchedule(exercises);
    const goals = this.setGoals(userProfile);

    return {
      exercises,
      schedule,
      goals
    };
  }
}

module.exports = new TrainingService();
```

## Testing

### 1. Unit Tests

```javascript
// tests/unit/example.test.js
const { expect } = require('chai');
const ExampleService = require('../../src/services/example');

describe('Example Service', () => {
  it('should perform expected operation', async () => {
    const result = await ExampleService.operation();
    expect(result).to.be.true;
  });
});
```

### 2. Integration Tests

```javascript
// tests/integration/api.test.js
const request = require('supertest');
const app = require('../../src/app');

describe('API Endpoints', () => {
  it('should return 200 for valid request', async () => {
    const response = await request(app)
      .get('/api/example')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).to.equal(200);
  });
});
```

### 3. Contract Tests

```javascript
// tests/contracts/TelosToken.test.js
const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('TelosToken', () => {
  let token;
  let owner;
  let addr1;

  beforeEach(async () => {
    const TelosToken = await ethers.getContractFactory('TelosToken');
    [owner, addr1] = await ethers.getSigners();
    token = await TelosToken.deploy();
  });

  it('should assign total supply to owner', async () => {
    const ownerBalance = await token.balanceOf(owner.address);
    expect(await token.totalSupply()).to.equal(ownerBalance);
  });
});
```

## Deployment

### 1. Production Build

```bash
npm run build
```

### 2. Environment Configuration

```bash
# .env.production
NODE_ENV=production
PORT=3000
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=your_production_jwt_secret
ETHEREUM_RPC_URL=your_production_rpc_url
```

### 3. Deployment Script

```bash
# scripts/deploy.sh
#!/bin/bash

# Build the application
npm run build

# Deploy to production
npm run deploy:prod
```

## Troubleshooting

### Common Issues

1. **Web3 Connection Issues**
   - Check MetaMask connection
   - Verify network configuration
   - Ensure contract addresses are correct

2. **Database Connection Issues**
   - Verify MongoDB connection string
   - Check database permissions
   - Ensure indexes are created

3. **API Errors**
   - Check request format
   - Verify authentication
   - Review error logs

### Debugging

1. Enable debug logging:
```bash
DEBUG=* npm run dev
```

2. Use VS Code debugger:
```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Program",
      "program": "${workspaceFolder}/src/app.js"
    }
  ]
}
```

## Best Practices

### 1. Code Organization
- Follow the project structure
- Use meaningful file names
- Keep files focused and small
- Use proper naming conventions

### 2. Error Handling
- Use try-catch blocks
- Log errors properly
- Return meaningful error messages
- Handle edge cases

### 3. Security
- Validate all inputs
- Use environment variables
- Implement proper authentication
- Follow security best practices

### 4. Performance
- Use caching where appropriate
- Optimize database queries
- Implement pagination
- Monitor performance metrics

## Resources

### Documentation
- [Node.js Documentation](https://nodejs.org/docs)
- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Ethers.js Documentation](https://docs.ethers.io/)
- [Hardhat Documentation](https://hardhat.org/getting-started/)

### Tools
- [VS Code](https://code.visualstudio.com/)
- [Postman](https://www.postman.com/)
- [MongoDB Compass](https://www.mongodb.com/products/compass)
- [MetaMask](https://metamask.io/)

### Community
- [Discord](https://discord.gg/telosprotocol)
- [GitHub Issues](https://github.com/telosprotocol/telos-protocol/issues)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/telos-protocol) 