const {Router}=require('express');
const { bookTicket, getBookingDetails } = require('./bookingController');
const bookingRouter=Router();

bookingRouter.post('/bookTicket',bookTicket);
bookingRouter.get('/bookingDetails/:id',getBookingDetails)

module.exports= bookingRouter;