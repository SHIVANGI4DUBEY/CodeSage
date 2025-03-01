require ('dotenv').config();
const app=require('./src/app');
console.log("App type:", typeof app);

//as server start s on port 3000 callback fn run when server is oin ready state
app.listen(3000,()=>{
console.log("Server is running on port 3000");
})