const { ethers } = require('ethers');
const TelosToken = require('../../contracts/TelosToken.json');
const ChallengeContract = require('../../contracts/ChallengeContract.json');

class Web3Agent {
    constructor() {
        this.provider = new ethers.providers.JsonRpcProvider(process.env.ETHEREUM_RPC_URL);
        this.telosContract = new ethers.Contract(
            process.env.TELOS_TOKEN_ADDRESS,
            TelosToken.abi,
            this.provider
        );
        this.challengeContract = new ethers.Contract(
            process.env.CHALLENGE_CONTRACT_ADDRESS,
            ChallengeContract.abi,
            this.provider
        );
    }

    async stakeTokens(userAddress, amount) {
        const signer = this.provider.getSigner(userAddress);
        const contract = this.telosContract.connect(signer);
        
        const tx = await contract.stake(ethers.utils.parseEther(amount.toString()));
        await tx.wait();
        
        return {
            success: true,
            transactionHash: tx.hash
        };
    }

    async getStakingRewards(userAddress) {
        const rewards = await this.telosContract.getStakingRewards(userAddress);
        return {
            amount: ethers.utils.formatEther(rewards),
            lastClaimed: new Date(await this.telosContract.lastRewardClaim(userAddress) * 1000)
        };
    }

    async createCognitiveChallenge({ userAddress, challengeType, duration, stakeAmount }) {
        const signer = this.provider.getSigner(userAddress);
        const contract = this.challengeContract.connect(signer);
        
        const tx = await contract.createChallenge(
            challengeType,
            duration,
            ethers.utils.parseEther(stakeAmount.toString())
        );
        await tx.wait();
        
        const event = await contract.queryFilter('ChallengeCreated', tx.blockNumber);
        const challengeId = event[0].args.challengeId;
        
        return {
            success: true,
            challengeId,
            transactionHash: tx.hash
        };
    }

    async verifyChallengeCompletion(challengeId, userAddress) {
        const signer = this.provider.getSigner(userAddress);
        const contract = this.challengeContract.connect(signer);
        
        const tx = await contract.verifyCompletion(challengeId);
        await tx.wait();
        
        const event = await contract.queryFilter('ChallengeCompleted', tx.blockNumber);
        const reward = event[0].args.reward;
        
        return {
            success: true,
            reward: ethers.utils.formatEther(reward),
            transactionHash: tx.hash
        };
    }

    async getTokenBalance(userAddress) {
        const balance = await this.telosContract.balanceOf(userAddress);
        const stakingInfo = await this.telosContract.stakingInfo(userAddress);
        const rewards = await this.telosContract.getStakingRewards(userAddress);

        return {
            balance: ethers.utils.formatEther(balance),
            staked: ethers.utils.formatEther(stakingInfo.amount),
            rewards: ethers.utils.formatEther(rewards),
            stakingStartTime: new Date(stakingInfo.startTime.toNumber() * 1000),
            lastRewardTime: new Date(stakingInfo.lastRewardTime.toNumber() * 1000)
        };
    }

    async transferTokens(userAddress, toAddress, amount) {
        const signer = this.provider.getSigner(userAddress);
        const contract = this.telosContract.connect(signer);
        
        const tx = await contract.transfer(
            toAddress,
            ethers.utils.parseEther(amount.toString())
        );
        await tx.wait();
        
        return {
            success: true,
            transactionHash: tx.hash
        };
    }

    async getChallengeHistory(userAddress) {
        const challenges = await this.challengeContract.getUserChallenges(userAddress);
        return challenges.map(challenge => ({
            id: challenge.id.toString(),
            type: challenge.challengeType,
            startTime: new Date(challenge.startTime.toNumber() * 1000),
            duration: challenge.duration.toNumber(),
            stakeAmount: ethers.utils.formatEther(challenge.stakeAmount),
            completed: challenge.completed,
            failed: challenge.failed
        }));
    }
}

module.exports = Web3Agent; 