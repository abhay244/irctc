const pool = require("../../config/db");
const trainQueries=require('./trainQueries');
const addTrain=(req,res)=>{
    const {trainId,name ,source,destination,totalSeats}=req.body;
    //first check if the train with this trainId exists or not
    pool.query(trainQueries.checkTrainExist, [trainId],(error,results)=>{
        if(error)return res.status(500).send(error.message);
        if(results.rows.length)return res.status(400).send("train with this trainId already exists"); 

        pool.query(trainQueries.addTrain,[trainId,name,source,destination,totalSeats,totalSeats],(error,results)=>{
            if(error)return res.status(500).send(error.message);
            return res.status(201).send("train added successfully");
        });
    }); 
}

const findTrains=(req,res)=>{
    const {source,destination}=req.body;
    pool.query(trainQueries.findTrains,[source,destination],(error,results)=>{
        if(error)return res.status(500).send(error.message);
        return res.status(200).send(results.rows);
    })
}

module.exports={addTrain,findTrains};