const {Router}=require('express');
const { addTrain, findTrains } = require('./trainController');
const trainRouter=Router();

trainRouter.post('/addTrain',addTrain);
trainRouter.post('/findTrains',findTrains)

module.exports=trainRouter;