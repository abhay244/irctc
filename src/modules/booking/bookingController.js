const pool=require('../../config/db');
const { checkTrainExist, updateSeats, selectSeatsforUpdate } = require('../train/trainQueries');
const bookingQueries=require('./bookingQueries');

const bookTicket = (req, res) => {
    const { userId, trainId } = req.body;

    // Start a transaction to tackle race condition
    pool.query('BEGIN', (error) => {
        if (error) return res.status(500).send(error.message);
        
        // fetch and lock this this train to prevent race conditions
        pool.query(selectSeatsforUpdate, [trainId], (selectError, selectResults) => {
            if (selectError) {
                return pool.query('ROLLBACK', (rollbackError) => {
                    if (rollbackError) return res.status(500).send(rollbackError.message);
                    return res.status(500).send(selectError.message);
                });
            }
            
            const data = selectResults.rows[0];
            if (!data) {
                return pool.query('ROLLBACK', (rollbackError) => {
                    if (rollbackError) return res.status(500).send(rollbackError.message);
                    return res.status(404).send("train with this id does not exists");
                });
            }
            
            if (data.seatsavailable <= 0) {
                return pool.query('ROLLBACK', (rollbackError) => {
                    if (rollbackError) return res.status(500).send(rollbackError.message);
                    return res.status(400).send("No seats are available in this train");
                });
            }

            const seatsAvailable = data.seatsavailable - 1;
            
            // book the ticket if seats are available in the train
            pool.query(bookingQueries.createBooking, [userId, trainId], (bookingError) => {
                if (bookingError) {
                    return pool.query('ROLLBACK', (rollbackError) => {
                        if (rollbackError) return res.status(500).send(rollbackError.message);
                        return res.status(500).send(bookingError.message);
                    });
                }
                
                // Update seats of the train after successfull booking
                pool.query(updateSeats, [seatsAvailable, trainId], (updateError) => {
                    if (updateError) {
                        return pool.query('ROLLBACK', (rollbackError) => {
                            if (rollbackError) return res.status(500).send(rollbackError.message);
                            return res.status(500).send(updateError.message);
                        });
                    }
                    
                    // Commit transaction if no error happend before this step
                    pool.query('COMMIT', (commitError) => {
                        if (commitError) {
                            return pool.query('ROLLBACK', (rollbackError) => {
                                if (rollbackError) return res.status(500).send(rollbackError.message);
                                return res.status(500).send(commitError.message);
                            });
                        }
                        
                        res.status(200).send("booking successfull and also udated seats");
                    });
                });
            });
        });
    });
};


const getBookingDetails=async (req,res)=>{
    const id=req.params.id;
    const results=await pool.query(bookingQueries.getBookingById,[id]);
    if(results.rowCount===0)return res.status(400).send("no booking found with this id");
    const data=results.rows[0];
    let finalResponse;
    //finding train details
    const checkTrain= await pool.query(checkTrainExist,[data.trainid]);
    
    const data2=checkTrain.rows[0];
    finalResponse={...data,
        trainName:data2.name,
        source:data2.source,
        destination:data2.destination,
    };
    return res.status(200).send(finalResponse);

}

module.exports={bookTicket,getBookingDetails};