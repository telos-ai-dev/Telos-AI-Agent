const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    walletAddress: {
        type: String,
        required: true,
        unique: true
    },
    neuralProfile: {
        pfcAmygdalaBalance: {
            type: Number,
            default: 0
        },
        cognitiveVulnerabilities: [{
            type: String
        }],
        neuralPathwayMap: {
            type: Map,
            of: Number
        }
    },
    actProgress: {
        acceptance: {
            level: { type: Number, default: 1 },
            exercises: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Exercise'
            }]
        },
        defusion: {
            level: { type: Number, default: 1 },
            exercises: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Exercise'
            }]
        },
        presentMoment: {
            level: { type: Number, default: 1 },
            exercises: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Exercise'
            }]
        },
        observingSelf: {
            level: { type: Number, default: 1 },
            exercises: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Exercise'
            }]
        },
        values: {
            level: { type: Number, default: 1 },
            exercises: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Exercise'
            }]
        },
        committedAction: {
            level: { type: Number, default: 1 },
            exercises: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Exercise'
            }]
        }
    },
    telosTokens: {
        balance: { type: Number, default: 0 },
        staked: { type: Number, default: 0 },
        rewards: { type: Number, default: 0 }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastLogin: {
        type: Date,
        default: Date.now
    }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

// Method to update neural profile
userSchema.methods.updateNeuralProfile = async function(assessment) {
    this.neuralProfile = {
        ...this.neuralProfile,
        ...assessment
    };
    return this.save();
};

// Method to update ACT progress
userSchema.methods.updateACTProgress = async function(category, exerciseId) {
    if (this.actProgress[category]) {
        this.actProgress[category].exercises.push(exerciseId);
        // Level up logic
        if (this.actProgress[category].exercises.length % 5 === 0) {
            this.actProgress[category].level += 1;
        }
    }
    return this.save();
};

const User = mongoose.model('User', userSchema);

module.exports = User; 