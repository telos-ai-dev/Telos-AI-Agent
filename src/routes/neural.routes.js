const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const NeuralAssessmentAgent = require('../agents/neural/NeuralAssessmentAgent');
const neuralAgent = new NeuralAssessmentAgent();

// Get current neural assessment
router.get('/assessment', auth, async (req, res) => {
    try {
        const assessment = await neuralAgent.assessCognitiveState({
            digitalBehavior: req.user.digitalBehavior,
            emotionalResponses: req.user.emotionalResponses,
            attentionMetrics: req.user.attentionMetrics,
            decisionPatterns: req.user.decisionPatterns
        });

        res.json(assessment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Submit digital behavior data
router.post('/behavior', auth, async (req, res) => {
    try {
        const { behavior } = req.body;
        
        // Update user's digital behavior
        req.user.digitalBehavior = req.user.digitalBehavior || [];
        req.user.digitalBehavior.push({
            ...behavior,
            timestamp: Date.now()
        });

        // Keep only last 30 days of data
        const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
        req.user.digitalBehavior = req.user.digitalBehavior.filter(
            b => b.timestamp > thirtyDaysAgo
        );

        await req.user.save();

        // Get updated assessment
        const assessment = await neuralAgent.assessCognitiveState({
            digitalBehavior: req.user.digitalBehavior,
            emotionalResponses: req.user.emotionalResponses,
            attentionMetrics: req.user.attentionMetrics,
            decisionPatterns: req.user.decisionPatterns
        });

        res.json(assessment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Submit emotional response data
router.post('/emotions', auth, async (req, res) => {
    try {
        const { emotion } = req.body;
        
        // Update user's emotional responses
        req.user.emotionalResponses = req.user.emotionalResponses || [];
        req.user.emotionalResponses.push({
            ...emotion,
            timestamp: Date.now()
        });

        // Keep only last 30 days of data
        const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
        req.user.emotionalResponses = req.user.emotionalResponses.filter(
            e => e.timestamp > thirtyDaysAgo
        );

        await req.user.save();

        // Get updated assessment
        const assessment = await neuralAgent.assessCognitiveState({
            digitalBehavior: req.user.digitalBehavior,
            emotionalResponses: req.user.emotionalResponses,
            attentionMetrics: req.user.attentionMetrics,
            decisionPatterns: req.user.decisionPatterns
        });

        res.json(assessment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Submit attention metrics
router.post('/attention', auth, async (req, res) => {
    try {
        const { metrics } = req.body;
        
        // Update user's attention metrics
        req.user.attentionMetrics = req.user.attentionMetrics || [];
        req.user.attentionMetrics.push({
            ...metrics,
            timestamp: Date.now()
        });

        // Keep only last 30 days of data
        const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
        req.user.attentionMetrics = req.user.attentionMetrics.filter(
            m => m.timestamp > thirtyDaysAgo
        );

        await req.user.save();

        // Get updated assessment
        const assessment = await neuralAgent.assessCognitiveState({
            digitalBehavior: req.user.digitalBehavior,
            emotionalResponses: req.user.emotionalResponses,
            attentionMetrics: req.user.attentionMetrics,
            decisionPatterns: req.user.decisionPatterns
        });

        res.json(assessment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Submit decision pattern data
router.post('/decisions', auth, async (req, res) => {
    try {
        const { decision } = req.body;
        
        // Update user's decision patterns
        req.user.decisionPatterns = req.user.decisionPatterns || [];
        req.user.decisionPatterns.push({
            ...decision,
            timestamp: Date.now()
        });

        // Keep only last 30 days of data
        const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
        req.user.decisionPatterns = req.user.decisionPatterns.filter(
            d => d.timestamp > thirtyDaysAgo
        );

        await req.user.save();

        // Get updated assessment
        const assessment = await neuralAgent.assessCognitiveState({
            digitalBehavior: req.user.digitalBehavior,
            emotionalResponses: req.user.emotionalResponses,
            attentionMetrics: req.user.attentionMetrics,
            decisionPatterns: req.user.decisionPatterns
        });

        res.json(assessment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get neural pathway map
router.get('/pathway-map', auth, async (req, res) => {
    try {
        const assessment = await neuralAgent.assessCognitiveState({
            digitalBehavior: req.user.digitalBehavior,
            emotionalResponses: req.user.emotionalResponses,
            attentionMetrics: req.user.attentionMetrics,
            decisionPatterns: req.user.decisionPatterns
        });

        res.json(assessment.neuralPathwayMap);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get cognitive vulnerabilities
router.get('/vulnerabilities', auth, async (req, res) => {
    try {
        const assessment = await neuralAgent.assessCognitiveState({
            digitalBehavior: req.user.digitalBehavior,
            emotionalResponses: req.user.emotionalResponses,
            attentionMetrics: req.user.attentionMetrics,
            decisionPatterns: req.user.decisionPatterns
        });

        res.json(assessment.cognitiveVulnerabilities);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router; 