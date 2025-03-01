const express=require('express');
const aiRoutes=require('./routes/ai.routes')
const cors=require('cors')
//express fn creates an express app/server
//we save server in app variable
const app=express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// ✅ Debugging log for incoming requests
app.use((req, res, next) => {
    console.log("🔍 New Request Received:");
    console.log("➡️  Method:", req.method);
    console.log("➡️  URL:", req.url);
    console.log("➡️  Headers:", req.headers);
    console.log("➡️  Body:", req.body);
    next();
});


//dummy routes
app.get('/',(req,res)=>{
  res.send('hello world')
});
app.use('/ai',aiRoutes);

module.exports=app;