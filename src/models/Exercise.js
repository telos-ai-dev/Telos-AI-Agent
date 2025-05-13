const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: [
            'acceptance',
            'defusion',
            'presentMoment',
            'observingSelf',
            'values',
            'committedAction',
            'cognitiveFlexibility',
            'emotionalRegulation',
            'mindfulness',
            'selfCompassion'
        ]
    },
    subCategory: {
        type: String,
        required: true,
        enum: [
            // Acceptance
            'thoughtAcceptance',
            'emotionAcceptance',
            'sensationAcceptance',
            'urgeAcceptance',
            
            // Defusion
            'thoughtDefusion',
            'beliefDefusion',
            'storyDefusion',
            'labelDefusion',
            
            // Present Moment
            'breathAwareness',
            'bodyScan',
            'sensoryFocus',
            'environmentalAwareness',
            
            // Observing Self
            'selfObservation',
            'perspectiveTaking',
            'metacognition',
            'consciousnessAwareness',
            
            // Values
            'valueClarification',
            'valueAlignment',
            'valueBasedGoals',
            'valueConflictResolution',
            
            // Committed Action
            'goalSetting',
            'actionPlanning',
            'barrierManagement',
            'progressTracking',
            
            // Cognitive Flexibility
            'perspectiveShifting',
            'cognitiveReframing',
            'adaptiveThinking',
            'problemSolving',
            
            // Emotional Regulation
            'emotionIdentification',
            'emotionProcessing',
            'emotionTolerance',
            'emotionExpression',
            
            // Mindfulness
            'mindfulBreathing',
            'mindfulMovement',
            'mindfulEating',
            'mindfulCommunication',
            
            // Self Compassion
            'selfKindness',
            'commonHumanity',
            'mindfulSelfCompassion',
            'compassionateAction'
        ]
    },
    level: {
        type: Number,
        required: true,
        min: 1,
        max: 10
    },
    duration: {
        type: Number, // in minutes
        required: true
    },
    steps: [{
        type: String,
        required: true
    }],
    aiPrompts: [{
        type: String,
        required: true
    }],
    expectedOutcomes: [{
        type: String,
        required: true
    }],
    telosReward: {
        type: Number,
        required: true
    },
    neuralImpact: {
        pfcActivation: {
            type: Number,
            required: true,
            min: 0,
            max: 100
        },
        amygdalaRegulation: {
            type: Number,
            required: true,
            min: 0,
            max: 100
        },
        defaultModeNetwork: {
            type: Number,
            required: true,
            min: 0,
            max: 100
        },
        executiveFunction: {
            type: Number,
            required: true,
            min: 0,
            max: 100
        },
        emotionalRegulation: {
            type: Number,
            required: true,
            min: 0,
            max: 100
        },
        attentionControl: {
            type: Number,
            required: true,
            min: 0,
            max: 100
        }
    },
    prerequisites: [{
        category: {
            type: String,
            required: true,
            enum: [
                'acceptance',
                'defusion',
                'presentMoment',
                'observingSelf',
                'values',
                'committedAction',
                'cognitiveFlexibility',
                'emotionalRegulation',
                'mindfulness',
                'selfCompassion'
            ]
        },
        subCategory: {
            type: String,
            required: true
        },
        level: {
            type: Number,
            required: true,
            min: 1
        }
    }],
    difficulty: {
        type: String,
        required: true,
        enum: ['beginner', 'intermediate', 'advanced', 'expert']
    },
    timeOfDay: {
        type: [String],
        enum: ['morning', 'afternoon', 'evening', 'night'],
        default: ['morning', 'afternoon', 'evening']
    },
    environment: {
        type: [String],
        enum: ['quiet', 'noisy', 'public', 'private', 'outdoor', 'indoor'],
        default: ['quiet', 'private']
    },
    equipment: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt timestamp before saving
exerciseSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

// Static method to find exercises by category and level
exerciseSchema.statics.findByCategoryAndLevel = function(category, level) {
    return this.find({
        category,
        level: { $lte: level }
    }).sort({ level: 1 });
};

// Static method to find exercises by prerequisites
exerciseSchema.statics.findByPrerequisites = function(userProgress) {
    return this.find({
        prerequisites: {
            $all: Object.entries(userProgress).map(([category, progress]) => ({
                category,
                level: { $lte: progress.level }
            }))
        }
    });
};

// Method to calculate neural impact
exerciseSchema.methods.calculateNeuralImpact = function(userProfile) {
    const {
        pfcActivation,
        amygdalaRegulation,
        defaultModeNetwork,
        executiveFunction,
        emotionalRegulation,
        attentionControl
    } = this.neuralImpact;
    
    // Calculate weighted impact based on user's current neural state
    const impact = {
        pfcActivation: pfcActivation * (1 - userProfile.pfcActivation / 100),
        amygdalaRegulation: amygdalaRegulation * (1 - userProfile.amygdalaRegulation / 100),
        defaultModeNetwork: defaultModeNetwork * (1 - userProfile.defaultModeNetwork / 100),
        executiveFunction: executiveFunction * (1 - userProfile.executiveFunction / 100),
        emotionalRegulation: emotionalRegulation * (1 - userProfile.emotionalRegulation / 100),
        attentionControl: attentionControl * (1 - userProfile.attentionControl / 100)
    };
    
    // Calculate overall neural balance
    const neuralBalance = (
        impact.pfcActivation +
        impact.amygdalaRegulation +
        impact.defaultModeNetwork +
        impact.executiveFunction +
        impact.emotionalRegulation +
        impact.attentionControl
    ) / 6;
    
    return {
        impact,
        neuralBalance,
        recommendations: this.generateRecommendations(impact)
    };
};

// Method to generate personalized recommendations
exerciseSchema.methods.generateRecommendations = function(impact) {
    const recommendations = [];
    
    if (impact.pfcActivation > 70) {
        recommendations.push('Consider more challenging cognitive tasks');
    }
    if (impact.amygdalaRegulation > 70) {
        recommendations.push('Focus on emotional regulation exercises');
    }
    if (impact.defaultModeNetwork > 70) {
        recommendations.push('Practice more mindfulness exercises');
    }
    if (impact.executiveFunction > 70) {
        recommendations.push('Engage in complex problem-solving tasks');
    }
    if (impact.emotionalRegulation > 70) {
        recommendations.push('Work on emotional awareness and processing');
    }
    if (impact.attentionControl > 70) {
        recommendations.push('Practice focused attention exercises');
    }
    
    return recommendations;
};

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise; 