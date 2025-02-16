require ('dotenv').config();
const app=require('./src/app');

//as server starts on port 3000 callback fn run when server is oin ready state
app.listen(3000,()=>{
console.log("Server is running on port 3000");
})