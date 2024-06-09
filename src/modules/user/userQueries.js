const checkEmailExist="SELECT * FROM users WHERE email=$1";
const addUser="INSERT INTO users (name, email,password,type) VALUES ($1,$2,$3,$4)";
const loginUser="SELECT * FROM users WHERE email=$1 and password=$2";


module.exports={checkEmailExist,addUser,loginUser};