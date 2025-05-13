const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ethers = require('ethers');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded.userId });

        if (!user) {
            throw new Error();
        }

        req.token = token;
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Please authenticate.' });
    }
};

const verifyWallet = async (req, res, next) => {
    try {
        const { walletAddress, signature, message } = req.body;
        
        // Verify the signature using ethers.js
        const recoveredAddress = ethers.utils.verifyMessage(message, signature);
        
        if (recoveredAddress.toLowerCase() !== walletAddress.toLowerCase()) {
            throw new Error('Invalid signature');
        }

        req.walletAddress = walletAddress;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid wallet signature.' });
    }
};

module.exports = {
    auth,
    verifyWallet
}; 