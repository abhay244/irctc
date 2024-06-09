const jwt=require('jsonwebtoken');
const secret="123456789";
const adminApiKey="aaaaaaaaaaaaaaaaaaaaaaaaa";
const createAccessToken = (userId) => {
    return jwt.sign({ userId }, secret, { expiresIn: '24h' });
};

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(400);
    jwt.verify(token, secret, (err, user) => {
        if (err) return res.sendStatus(400); 
        req.user = user;
        next();
    });
};

const validateAdminApiKey = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    if (!apiKey) {
        return res.status(400).send('API key is missing');
    }
    if (apiKey !== adminApiKey) {
        return res.status(400).send('Invalid API key');
    }
    next();
};
module.exports={createAccessToken, authenticateToken,validateAdminApiKey};