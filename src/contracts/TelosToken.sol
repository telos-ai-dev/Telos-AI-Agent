// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract TelosToken is ERC20, Ownable, Pausable {
    struct Challenge {
        address user;
        uint256 challengeType;
        uint256 duration;
        uint256 stakeAmount;
        uint256 startTime;
        bool completed;
    }

    struct StakingInfo {
        uint256 amount;
        uint256 startTime;
        uint256 lastRewardTime;
    }

    mapping(address => StakingInfo) public stakingInfo;
    mapping(uint256 => Challenge) public challenges;
    uint256 public challengeCount;
    
    uint256 public constant REWARD_RATE = 5; // 5% APY
    uint256 public constant REWARD_INTERVAL = 1 days;
    
    event ChallengeCreated(address indexed user, uint256 challengeId, uint256 stakeAmount);
    event ChallengeCompleted(address indexed user, uint256 challengeId);
    event TokensStaked(address indexed user, uint256 amount);
    event TokensUnstaked(address indexed user, uint256 amount);
    event RewardsClaimed(address indexed user, uint256 amount);

    constructor() ERC20("Telos", "TELOS") {
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function createChallenge(
        uint256 _challengeType,
        uint256 _duration,
        uint256 _stakeAmount
    ) external whenNotPaused {
        require(_stakeAmount > 0, "Stake amount must be greater than 0");
        require(balanceOf(msg.sender) >= _stakeAmount, "Insufficient balance");

        _transfer(msg.sender, address(this), _stakeAmount);
        
        challenges[challengeCount] = Challenge({
            user: msg.sender,
            challengeType: _challengeType,
            duration: _duration,
            stakeAmount: _stakeAmount,
            startTime: block.timestamp,
            completed: false
        });

        emit ChallengeCreated(msg.sender, challengeCount, _stakeAmount);
        challengeCount++;
    }

    function verifyChallenge(uint256 _challengeId) external whenNotPaused {
        Challenge storage challenge = challenges[_challengeId];
        require(challenge.user == msg.sender, "Not challenge owner");
        require(!challenge.completed, "Challenge already completed");
        require(block.timestamp >= challenge.startTime + challenge.duration, "Challenge duration not met");

        challenge.completed = true;
        _transfer(address(this), msg.sender, challenge.stakeAmount * 2); // Double the stake as reward

        emit ChallengeCompleted(msg.sender, _challengeId);
    }

    function stake(uint256 _amount) external whenNotPaused {
        require(_amount > 0, "Amount must be greater than 0");
        require(balanceOf(msg.sender) >= _amount, "Insufficient balance");

        _transfer(msg.sender, address(this), _amount);
        
        StakingInfo storage info = stakingInfo[msg.sender];
        if (info.amount > 0) {
            _claimRewards(msg.sender);
        }
        
        info.amount += _amount;
        info.startTime = block.timestamp;
        info.lastRewardTime = block.timestamp;

        emit TokensStaked(msg.sender, _amount);
    }

    function unstake() external whenNotPaused {
        StakingInfo storage info = stakingInfo[msg.sender];
        require(info.amount > 0, "No tokens staked");

        _claimRewards(msg.sender);
        
        uint256 amount = info.amount;
        info.amount = 0;
        
        _transfer(address(this), msg.sender, amount);

        emit TokensUnstaked(msg.sender, amount);
    }

    function claimRewards() external whenNotPaused {
        _claimRewards(msg.sender);
    }

    function _claimRewards(address _user) internal {
        StakingInfo storage info = stakingInfo[_user];
        if (info.amount == 0) return;

        uint256 timeElapsed = block.timestamp - info.lastRewardTime;
        uint256 rewards = (info.amount * REWARD_RATE * timeElapsed) / (365 days * 100);
        
        if (rewards > 0) {
            _mint(_user, rewards);
            info.lastRewardTime = block.timestamp;
            emit RewardsClaimed(_user, rewards);
        }
    }

    function getStakingRewards(address _user) external view returns (uint256) {
        StakingInfo storage info = stakingInfo[_user];
        if (info.amount == 0) return 0;

        uint256 timeElapsed = block.timestamp - info.lastRewardTime;
        return (info.amount * REWARD_RATE * timeElapsed) / (365 days * 100);
    }
} 