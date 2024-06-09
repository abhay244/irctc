const {Router}=require('express');
const { bookTicket, getBookingDetails } = require('./bookingController');
const { authenticateToken } = require('../../util/util');
const bookingRouter=Router();

bookingRouter.post('/bookTicket',authenticateToken,bookTicket);
bookingRouter.get('/bookingDetails/:id',authenticateToken,getBookingDetails)

module.exports= bookingRouter;