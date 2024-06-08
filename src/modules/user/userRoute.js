const {Router}=require('express');
const { getUsers } = require('./userController');

const userRouter=Router();

userRouter.get("/",(req,res)=>{
    res.send("using api routes");
});

userRouter.get('/allUsers',getUsers);

module.exports=userRouter;