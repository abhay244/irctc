const addTrain="INSERT INTO train(id,name,source,destination,totalSeats,seatsAvailable) VALUES ($1, $2, $3, $4, $5, $6)";
const checkTrainExist="SELECT * FROM train WHERE id=$1";
const findTrains="SELECT * FROM train WHERE source=$1 and destination=$2";
const updateSeats="UPDATE train SET seatsavailable=$1 WHERE id=$2";
const selectSeatsforUpdate="SELECT seatsavailable FROM train WHERE id = $1 FOR UPDATE";

module.exports={addTrain,checkTrainExist,findTrains,updateSeats,selectSeatsforUpdate};