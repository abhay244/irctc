const pool=require('../../config/db');
const { createAccessToken } = require('../../util/util');
const userQueries=require('./userQueries')
const getUsers=(req,res)=>{
    pool.query("SELECT * FROM users",(error,results)=>{
        if(error){
            throw error;
        }
        res.status(200).json(results.rows);
    })
}

//adding new admin or nonAdmin user
const addUser=(req,res)=>{
    const {name,email,password,type}=req.body;
    //check if email already exist
    console.log(type);
    pool.query(userQueries.checkEmailExist,[email],(error,results)=>{
        if (error)return res.status(500).send(error.message);
        if(results.rows.length){
           return res.status(400).send("Email already exists");
        }
        pool.query(userQueries.addUser,[name,email,password,type],(error,results)=>{
            if(error)return res.status(500).send(error.message);
            return res.status(201).send("user created successfully");
        });
        
    });
}

//login user

const loginUser=(req,res)=>{
    const {email,password}=req.body;
    pool.query(userQueries.loginUser,[email,password],async (error,results)=>{
        if(error)return res.status(500).send(error.message);
        const data=results.rows[0];
        const token=await createAccessToken(data.id);
        return res.status(200).send({...data,
            accessToken:token,
        });
    })
}


module.exports={getUsers,addUser, loginUser};