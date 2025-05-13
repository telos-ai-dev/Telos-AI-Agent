# Contributing to Telos Protocol

Thank you for your interest in contributing to Telos Protocol! This document provides guidelines and instructions for contributing to our project.

## 🌟 Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md).

## 🎯 How Can I Contribute?

### Reporting Bugs

- Check if the bug has already been reported in the issues section
- Use the bug report template when creating a new issue
- Include detailed steps to reproduce the bug
- Include screenshots or videos if applicable
- Specify your environment (OS, browser, etc.)

### Suggesting Enhancements

- Check if the enhancement has already been suggested
- Use the feature request template
- Provide a clear description of the enhancement
- Explain why this enhancement would be useful
- Include any relevant examples or mockups

### Pull Requests

1. Fork the repository
2. Create a new branch for your feature
3. Make your changes
4. Write or update tests as needed
5. Update documentation
6. Submit a pull request

## 💻 Development Setup

### Prerequisites

- Node.js (v16+)
- MongoDB
- MetaMask or Web3 wallet
- Git

### Local Development

1. Fork and clone the repository
2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm run dev
```

### Running Tests

```bash
# Run all tests
npm test

# Run specific test file
npm test -- path/to/test.js

# Run tests with coverage
npm run test:coverage
```

## 📝 Coding Standards

### JavaScript/Node.js

- Follow the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- Use ESLint for code linting
- Use Prettier for code formatting
- Write meaningful commit messages

### Smart Contracts

- Follow the [Solidity Style Guide](https://docs.soliditylang.org/en/latest/style-guide.html)
- Use OpenZeppelin contracts when possible
- Write comprehensive tests
- Document all functions and state variables

### Documentation

- Keep documentation up to date
- Use clear and concise language
- Include code examples where appropriate
- Follow the existing documentation style

## 🔍 Code Review Process

1. All pull requests require at least one review
2. CI checks must pass
3. Code coverage must not decrease
4. Documentation must be updated
5. Tests must be added for new features

## 📚 Documentation

### Writing Documentation

- Use Markdown format
- Include code examples
- Add screenshots when helpful
- Keep it concise and clear

### API Documentation

- Document all endpoints
- Include request/response examples
- Specify authentication requirements
- List possible error responses

## 🐛 Bug Reports

Please use the bug report template:

```markdown
## Bug Description
[Detailed description of the bug]

## Steps to Reproduce
1. [First step]
2. [Second step]
3. [And so on...]

## Expected Behavior
[What you expected to happen]

## Actual Behavior
[What actually happened]

## Environment
- OS: [e.g., macOS, Windows]
- Browser: [e.g., Chrome, Firefox]
- Node.js version: [e.g., v16.0.0]
- MetaMask version: [e.g., v10.0.0]

## Additional Context
[Any additional information that might be helpful]
```

## ✨ Feature Requests

Please use the feature request template:

```markdown
## Feature Description
[Detailed description of the feature]

## Use Case
[How would this feature be used?]

## Benefits
[What benefits would this feature provide?]

## Implementation Ideas
[Any ideas about how to implement this feature]

## Additional Context
[Any additional information that might be helpful]
```

## 📈 Pull Request Process

1. Update the README.md with details of changes if needed
2. Update the documentation with any new features
3. Add tests for new functionality
4. Ensure all tests pass
5. Update the CHANGELOG.md

## 🎨 Style Guide

### Git Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line

### JavaScript Style

```javascript
// Good
const calculateTotal = (items) => {
  return items.reduce((sum, item) => sum + item.price, 0);
};

// Bad
function calculateTotal(items) {
  var sum = 0;
  for(var i = 0; i < items.length; i++) {
    sum += items[i].price;
  }
  return sum;
}
```

### Solidity Style

```solidity
// Good
contract Token {
    string public name;
    string public symbol;
    uint256 public totalSupply;
    
    mapping(address => uint256) public balanceOf;
    
    event Transfer(address indexed from, address indexed to, uint256 value);
    
    function transfer(address to, uint256 value) public returns (bool) {
        require(balanceOf[msg.sender] >= value, "Insufficient balance");
        balanceOf[msg.sender] -= value;
        balanceOf[to] += value;
        emit Transfer(msg.sender, to, value);
        return true;
    }
}

// Bad
contract Token {
    string name;
    string symbol;
    uint256 totalSupply;
    mapping(address => uint256) balances;
    
    function transfer(address to, uint256 value) {
        if(balances[msg.sender] >= value) {
            balances[msg.sender] -= value;
            balances[to] += value;
        }
    }
}
```

## 📋 Checklist for Pull Requests

- [ ] Code follows the style guidelines
- [ ] Tests have been added/updated
- [ ] Documentation has been updated
- [ ] Commit messages follow the guidelines
- [ ] All CI checks pass
- [ ] Code coverage has not decreased
- [ ] Changes have been tested locally

## 🤝 Questions and Support

If you have any questions or need support:

- Join our [Discord community](https://discord.gg/telosprotocol)
- Open an issue for bug reports or feature requests
- Contact the maintainers at contact@telosprotocol.com

Thank you for contributing to Telos Protocol! 🚀 