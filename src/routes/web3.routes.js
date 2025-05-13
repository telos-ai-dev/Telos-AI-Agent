const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const Web3Agent = require('../agents/web3/Web3Agent');
const web3Agent = new Web3Agent();
const ethers = require('ethers');

// Get user's Telos token balance and staking info
router.get('/balance', auth, async (req, res) => {
    try {
        const tokenInfo = await web3Agent.getTokenBalance(req.user.walletAddress);
        res.json(tokenInfo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Stake Telos tokens
router.post('/stake', auth, async (req, res) => {
    try {
        const { amount } = req.body;
        const result = await web3Agent.stakeTokens(req.user.walletAddress, amount);
        
        // Update user's staked amount
        req.user.telosTokens.staked += Number(amount);
        await req.user.save();
        
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Unstake Telos tokens
router.post('/unstake', auth, async (req, res) => {
    try {
        const result = await web3Agent.telosContract.unstake();
        
        // Update user's staked amount
        req.user.telosTokens.staked = 0;
        await req.user.save();
        
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get staking rewards
router.get('/rewards', auth, async (req, res) => {
    try {
        const rewards = await web3Agent.getStakingRewards(req.user.walletAddress);
        res.json(rewards);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Transfer Telos tokens
router.post('/transfer', auth, async (req, res) => {
    try {
        const { toAddress, amount } = req.body;
        const result = await web3Agent.transferTokens(
            req.user.walletAddress,
            toAddress,
            amount
        );
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create cognitive challenge
router.post('/challenges', auth, async (req, res) => {
    try {
        const { challengeType, duration, stakeAmount } = req.body;
        
        const result = await web3Agent.createCognitiveChallenge({
            userAddress: req.user.walletAddress,
            challengeType,
            duration,
            stakeAmount
        });
        
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Verify challenge completion
router.post('/challenges/:challengeId/verify', auth, async (req, res) => {
    try {
        const result = await web3Agent.verifyChallengeCompletion(
            req.params.challengeId,
            req.user.walletAddress
        );
        
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get challenge history
router.get('/challenges', auth, async (req, res) => {
    try {
        const challenges = await web3Agent.getChallengeHistory(req.user.walletAddress);
        res.json(challenges);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get staking history
router.get('/staking-history', auth, async (req, res) => {
    try {
        const stakingInfo = await web3Agent.telosContract.stakingInfo(req.user.walletAddress);
        res.json({
            amount: ethers.utils.formatEther(stakingInfo.amount),
            startTime: new Date(stakingInfo.startTime.toNumber() * 1000),
            lastRewardTime: new Date(stakingInfo.lastRewardTime.toNumber() * 1000)
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router; 