const {Router}=require('express');
const { addTrain, findTrains } = require('./trainController');
const { authenticateToken, validateAdminApiKey } = require('../../util/util');
const trainRouter=Router();

trainRouter.post('/addTrain',validateAdminApiKey,addTrain);
trainRouter.post('/findTrains',authenticateToken,findTrains)

module.exports=trainRouter;