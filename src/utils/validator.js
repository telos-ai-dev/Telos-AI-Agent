const { body, validationResult } = require('express-validator');

const validateUserRegistration = [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
        .matches(/\d/)
        .withMessage('Password must contain a number'),
    body('username')
        .isLength({ min: 3 })
        .withMessage('Username must be at least 3 characters long')
        .matches(/^[a-zA-Z0-9_]+$/)
        .withMessage('Username can only contain letters, numbers, and underscores')
];

const validateExercise = [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('category').notEmpty().withMessage('Category is required'),
    body('level').isInt({ min: 1, max: 5 }).withMessage('Level must be between 1 and 5'),
    body('duration').isInt({ min: 1 }).withMessage('Duration must be a positive number')
];

const validateAssessment = [
    body('digitalBehavior').isArray().withMessage('Digital behavior must be an array'),
    body('emotionalResponses').isArray().withMessage('Emotional responses must be an array'),
    body('attentionMetrics').isArray().withMessage('Attention metrics must be an array'),
    body('decisionPatterns').isArray().withMessage('Decision patterns must be an array')
];

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    validateUserRegistration,
    validateExercise,
    validateAssessment,
    validateRequest
}; 