const pool = require("../../config/db");
const { findUserById } = require("../user/userQueries");
const trainQueries=require('./trainQueries');
const addTrain=async(req,res)=>{
    const {trainId,name ,source,destination,totalSeats}=req.body;
    // const userId=req.user.userId;
    // //check if the user adding the train is admin or not
    // let user=await pool.query(findUserById,[userId]);
    // user=user.rows[0];
    // if(user.type!='admin'){
    //     return res.status(400).send("this user is not admin so cannot add train");
    // }
    
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