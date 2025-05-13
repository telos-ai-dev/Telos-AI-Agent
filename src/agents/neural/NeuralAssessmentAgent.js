const User = require('../../models/User');

class NeuralAssessmentAgent {
    constructor() {
        this.neuralMetrics = {
            pfcActivation: 0,
            amygdalaRegulation: 0,
            defaultModeNetwork: 0,
            executiveFunction: 0,
            emotionalRegulation: 0,
            attentionControl: 0
        };
    }

    async assessCognitiveState(userData) {
        const {
            digitalBehavior,
            emotionalResponses,
            attentionMetrics,
            decisionPatterns
        } = userData;

        // Calculate neural metrics
        const neuralMetrics = await this.calculateNeuralMetrics({
            digitalBehavior,
            emotionalResponses,
            attentionMetrics,
            decisionPatterns
        });

        // Generate neural pathway map
        const pathwayMap = this.generateNeuralPathwayMap(neuralMetrics);

        // Identify cognitive vulnerabilities
        const vulnerabilities = this.identifyVulnerabilities(neuralMetrics);

        // Generate personalized recommendations
        const recommendations = this.generateRecommendations(neuralMetrics, vulnerabilities);

        return {
            neuralMetrics,
            pathwayMap,
            vulnerabilities,
            recommendations
        };
    }

    async calculateNeuralMetrics(data) {
        const metrics = { ...this.neuralMetrics };

        // Calculate PFC Activation
        metrics.pfcActivation = this.calculatePFCActivation(data);

        // Calculate Amygdala Regulation
        metrics.amygdalaRegulation = this.calculateAmygdalaRegulation(data);

        // Calculate Default Mode Network
        metrics.defaultModeNetwork = this.calculateDefaultModeNetwork(data);

        // Calculate Executive Function
        metrics.executiveFunction = this.calculateExecutiveFunction(data);

        // Calculate Emotional Regulation
        metrics.emotionalRegulation = this.calculateEmotionalRegulation(data);

        // Calculate Attention Control
        metrics.attentionControl = this.calculateAttentionControl(data);

        return metrics;
    }

    calculatePFCActivation(data) {
        const { decisionPatterns, attentionMetrics } = data;
        let score = 0;

        // Analyze decision-making patterns
        if (decisionPatterns) {
            const rationalDecisions = decisionPatterns.filter(d => d.type === 'rational').length;
            const totalDecisions = decisionPatterns.length;
            score += (rationalDecisions / totalDecisions) * 40;
        }

        // Analyze attention metrics
        if (attentionMetrics) {
            const focusDuration = attentionMetrics.reduce((sum, m) => sum + m.duration, 0);
            const totalDuration = attentionMetrics.reduce((sum, m) => sum + m.totalTime, 0);
            score += (focusDuration / totalDuration) * 30;
        }

        // Analyze digital behavior
        if (data.digitalBehavior) {
            const productiveTime = data.digitalBehavior.filter(b => b.type === 'productive').length;
            const totalBehaviors = data.digitalBehavior.length;
            score += (productiveTime / totalBehaviors) * 30;
        }

        return Math.min(100, Math.max(0, score));
    }

    calculateAmygdalaRegulation(data) {
        const { emotionalResponses } = data;
        let score = 0;

        if (emotionalResponses) {
            // Calculate emotional stability
            const stableResponses = emotionalResponses.filter(e => e.intensity < 7).length;
            const totalResponses = emotionalResponses.length;
            score += (stableResponses / totalResponses) * 40;

            // Calculate recovery time
            const avgRecoveryTime = emotionalResponses.reduce((sum, e) => sum + e.recoveryTime, 0) / totalResponses;
            score += (1 - (avgRecoveryTime / 3600)) * 30; // Normalize to 1 hour

            // Calculate emotional awareness
            const awareResponses = emotionalResponses.filter(e => e.awareness > 7).length;
            score += (awareResponses / totalResponses) * 30;
        }

        return Math.min(100, Math.max(0, score));
    }

    calculateDefaultModeNetwork(data) {
        const { digitalBehavior, attentionMetrics } = data;
        let score = 0;

        // Calculate mind-wandering frequency
        if (attentionMetrics) {
            const mindWanderingEpisodes = attentionMetrics.filter(m => m.type === 'mindWandering').length;
            const totalEpisodes = attentionMetrics.length;
            score += (1 - (mindWanderingEpisodes / totalEpisodes)) * 40;
        }

        // Calculate digital distraction
        if (digitalBehavior) {
            const focusedActivities = digitalBehavior.filter(b => b.focusLevel > 7).length;
            const totalActivities = digitalBehavior.length;
            score += (focusedActivities / totalActivities) * 30;
        }

        // Calculate present moment awareness
        if (data.emotionalResponses) {
            const presentResponses = data.emotionalResponses.filter(e => e.presentMomentAwareness > 7).length;
            const totalResponses = data.emotionalResponses.length;
            score += (presentResponses / totalResponses) * 30;
        }

        return Math.min(100, Math.max(0, score));
    }

    calculateExecutiveFunction(data) {
        const { decisionPatterns, attentionMetrics } = data;
        let score = 0;

        // Analyze planning and organization
        if (decisionPatterns) {
            const plannedDecisions = decisionPatterns.filter(d => d.planned).length;
            const totalDecisions = decisionPatterns.length;
            score += (plannedDecisions / totalDecisions) * 30;
        }

        // Analyze task switching
        if (attentionMetrics) {
            const efficientSwitches = attentionMetrics.filter(m => m.switchEfficiency > 7).length;
            const totalSwitches = attentionMetrics.length;
            score += (efficientSwitches / totalSwitches) * 30;
        }

        // Analyze goal-directed behavior
        if (data.digitalBehavior) {
            const goalDirected = data.digitalBehavior.filter(b => b.goalDirected).length;
            const totalBehaviors = data.digitalBehavior.length;
            score += (goalDirected / totalBehaviors) * 40;
        }

        return Math.min(100, Math.max(0, score));
    }

    calculateEmotionalRegulation(data) {
        const { emotionalResponses } = data;
        let score = 0;

        if (emotionalResponses) {
            // Calculate emotional intensity management
            const managedResponses = emotionalResponses.filter(e => e.regulation > 7).length;
            const totalResponses = emotionalResponses.length;
            score += (managedResponses / totalResponses) * 40;

            // Calculate emotional expression
            const appropriateExpressions = emotionalResponses.filter(e => e.expressionAppropriate).length;
            score += (appropriateExpressions / totalResponses) * 30;

            // Calculate emotional understanding
            const understoodResponses = emotionalResponses.filter(e => e.understanding > 7).length;
            score += (understoodResponses / totalResponses) * 30;
        }

        return Math.min(100, Math.max(0, score));
    }

    calculateAttentionControl(data) {
        const { attentionMetrics } = data;
        let score = 0;

        if (attentionMetrics) {
            // Calculate sustained attention
            const sustainedFocus = attentionMetrics.filter(m => m.sustainedFocus > 7).length;
            const totalMetrics = attentionMetrics.length;
            score += (sustainedFocus / totalMetrics) * 40;

            // Calculate selective attention
            const selectiveFocus = attentionMetrics.filter(m => m.selectiveFocus > 7).length;
            score += (selectiveFocus / totalMetrics) * 30;

            // Calculate divided attention
            const dividedFocus = attentionMetrics.filter(m => m.dividedFocus > 7).length;
            score += (dividedFocus / totalMetrics) * 30;
        }

        return Math.min(100, Math.max(0, score));
    }

    generateNeuralPathwayMap(metrics) {
        return {
            cognitiveControl: {
                strength: metrics.pfcActivation,
                connections: {
                    executiveFunction: metrics.executiveFunction,
                    attentionControl: metrics.attentionControl
                }
            },
            emotionalProcessing: {
                strength: metrics.amygdalaRegulation,
                connections: {
                    emotionalRegulation: metrics.emotionalRegulation,
                    defaultModeNetwork: metrics.defaultModeNetwork
                }
            },
            selfAwareness: {
                strength: metrics.defaultModeNetwork,
                connections: {
                    emotionalRegulation: metrics.emotionalRegulation,
                    executiveFunction: metrics.executiveFunction
                }
            }
        };
    }

    identifyVulnerabilities(metrics) {
        const vulnerabilities = [];

        // Check PFC Activation
        if (metrics.pfcActivation < 60) {
            vulnerabilities.push({
                area: 'Cognitive Control',
                description: 'Reduced prefrontal cortex activation',
                impact: 'May affect decision-making and impulse control',
                recommendations: [
                    'Practice mindfulness meditation',
                    'Engage in cognitive training exercises',
                    'Implement structured decision-making processes'
                ]
            });
        }

        // Check Amygdala Regulation
        if (metrics.amygdalaRegulation < 60) {
            vulnerabilities.push({
                area: 'Emotional Processing',
                description: 'Difficulty regulating emotional responses',
                impact: 'May lead to increased stress and anxiety',
                recommendations: [
                    'Practice emotion regulation techniques',
                    'Develop stress management strategies',
                    'Engage in regular physical exercise'
                ]
            });
        }

        // Check Default Mode Network
        if (metrics.defaultModeNetwork < 60) {
            vulnerabilities.push({
                area: 'Self-Awareness',
                description: 'Reduced default mode network activity',
                impact: 'May affect self-reflection and introspection',
                recommendations: [
                    'Practice mindfulness meditation',
                    'Engage in journaling',
                    'Schedule regular self-reflection time'
                ]
            });
        }

        // Check Executive Function
        if (metrics.executiveFunction < 60) {
            vulnerabilities.push({
                area: 'Executive Function',
                description: 'Challenges with planning and organization',
                impact: 'May affect goal achievement and task completion',
                recommendations: [
                    'Use task management tools',
                    'Break down complex tasks',
                    'Practice time management techniques'
                ]
            });
        }

        // Check Emotional Regulation
        if (metrics.emotionalRegulation < 60) {
            vulnerabilities.push({
                area: 'Emotional Regulation',
                description: 'Difficulty managing emotional responses',
                impact: 'May affect relationships and well-being',
                recommendations: [
                    'Learn emotion regulation techniques',
                    'Practice emotional awareness',
                    'Develop healthy coping strategies'
                ]
            });
        }

        // Check Attention Control
        if (metrics.attentionControl < 60) {
            vulnerabilities.push({
                area: 'Attention Control',
                description: 'Challenges with focus and attention',
                impact: 'May affect productivity and learning',
                recommendations: [
                    'Practice focused attention exercises',
                    'Implement distraction management strategies',
                    'Create an optimal work environment'
                ]
            });
        }

        return vulnerabilities;
    }

    generateRecommendations(metrics, vulnerabilities) {
        const recommendations = {
            shortTerm: [],
            mediumTerm: [],
            longTerm: []
        };

        // Generate short-term recommendations
        vulnerabilities.forEach(v => {
            recommendations.shortTerm.push(...v.recommendations.slice(0, 2));
        });

        // Generate medium-term recommendations
        if (metrics.pfcActivation < 70) {
            recommendations.mediumTerm.push(
                'Implement a daily cognitive training routine',
                'Practice structured problem-solving exercises'
            );
        }

        if (metrics.amygdalaRegulation < 70) {
            recommendations.mediumTerm.push(
                'Develop a comprehensive stress management plan',
                'Practice regular emotion regulation exercises'
            );
        }

        // Generate long-term recommendations
        if (metrics.defaultModeNetwork < 70) {
            recommendations.longTerm.push(
                'Establish a regular mindfulness practice',
                'Develop a personal growth and development plan'
            );
        }

        if (metrics.executiveFunction < 70) {
            recommendations.longTerm.push(
                'Create a long-term goal achievement system',
                'Develop advanced planning and organization skills'
            );
        }

        return recommendations;
    }
}

module.exports = NeuralAssessmentAgent; 