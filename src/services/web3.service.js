const { ethers } = require('ethers');
const TelosToken = require('../contracts/TelosToken.json');
const ChallengeContract = require('../contracts/ChallengeContract.json');

class Web3Service {
    constructor() {
        this.provider = new ethers.providers.Web3Provider(window.ethereum);
        this.signer = this.provider.getSigner();
        this.telosToken = new ethers.Contract(
            process.env.TELOS_TOKEN_ADDRESS,
            TelosToken.abi,
            this.signer
        );
        this.challengeContract = new ethers.Contract(
            process.env.CHALLENGE_CONTRACT_ADDRESS,
            ChallengeContract.abi,
            this.signer
        );
    }

    async getBalance(address) {
        return await this.telosToken.balanceOf(address);
    }

    async stake(amount) {
        const tx = await this.telosToken.stake(amount);
        return await tx.wait();
    }

    async unstake(amount) {
        const tx = await this.telosToken.unstake(amount);
        return await tx.wait();
    }

    async createChallenge(challengeType, duration, stakeAmount) {
        const tx = await this.challengeContract.createChallenge(
            challengeType,
            duration,
            stakeAmount
        );
        return await tx.wait();
    }

    async getStakingHistory(address) {
        return await this.telosToken.getStakingHistory(address);
    }

    async getChallenges(address) {
        return await this.challengeContract.getUserChallenges(address);
    }
}

module.exports = new Web3Service(); 