const {Router}=require('express');
const { getUsers, addUser, loginUser } = require('./userController');

const userRouter=Router();

userRouter.get("/",(req,res)=>{
    res.send("using api routes");
});

userRouter.get('/allUsers',getUsers);
userRouter.post('/addUser',addUser);
userRouter.post('/loginUser',loginUser)

module.exports=userRouter;