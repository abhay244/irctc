const createBooking="INSERT INTO booking(userId,trainId) VALUES($1,$2)";
const getBookingById="SELECT * FROM booking WHERE id=$1";
module.exports={createBooking, getBookingById};