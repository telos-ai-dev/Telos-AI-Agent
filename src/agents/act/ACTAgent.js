const { OpenAI } = require('openai');

class ACTAgent {
    constructor() {
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY
        });
    }

    async processAcceptance(userInput, context) {
        // Implementation of Acceptance process
        const prompt = this._buildAcceptancePrompt(userInput, context);
        const response = await this._getAIResponse(prompt);
        return this._processAcceptanceResponse(response);
    }

    async processDefusion(userInput, context) {
        // Implementation of Cognitive Defusion process
        const prompt = this._buildDefusionPrompt(userInput, context);
        const response = await this._getAIResponse(prompt);
        return this._processDefusionResponse(response);
    }

    async processPresentMoment(userInput, context) {
        // Implementation of Present Moment Awareness process
        const prompt = this._buildPresentMomentPrompt(userInput, context);
        const response = await this._getAIResponse(prompt);
        return this._processPresentMomentResponse(response);
    }

    async processObservingSelf(userInput, context) {
        // Implementation of Observing Self process
        const prompt = this._buildObservingSelfPrompt(userInput, context);
        const response = await this._getAIResponse(prompt);
        return this._processObservingSelfResponse(response);
    }

    async processValues(userInput, context) {
        // Implementation of Values Clarification process
        const prompt = this._buildValuesPrompt(userInput, context);
        const response = await this._getAIResponse(prompt);
        return this._processValuesResponse(response);
    }

    async processCommittedAction(userInput, context) {
        // Implementation of Committed Action process
        const prompt = this._buildCommittedActionPrompt(userInput, context);
        const response = await this._getAIResponse(prompt);
        return this._processCommittedActionResponse(response);
    }

    // Private helper methods
    async _getAIResponse(prompt) {
        try {
            const completion = await this.openai.chat.completions.create({
                model: "gpt-4",
                messages: [
                    {
                        role: "system",
                        content: "You are an ACT (Acceptance and Commitment Therapy) expert AI assistant."
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                temperature: 0.7,
                max_tokens: 500
            });
            return completion.choices[0].message.content;
        } catch (error) {
            console.error('Error getting AI response:', error);
            throw error;
        }
    }

    _buildAcceptancePrompt(userInput, context) {
        return `Analyze the following situation from an ACT perspective, focusing on acceptance:
        User Input: ${userInput}
        Context: ${JSON.stringify(context)}
        Provide guidance on how to practice acceptance in this situation.`;
    }

    // Additional private methods for other ACT processes...
}

module.exports = ACTAgent; 