const express=require('express');
const userRouter = require('./src/modules/user/userRoute');
const app=express();
const PORT=8000;

app.get('/',(req,res)=>{
    res.send("Hello world")
});

app.use(express.json());

app.use("/api/v1/user",userRouter);
app.listen(PORT,()=>console.log(`app listening on port ${PORT}`));

