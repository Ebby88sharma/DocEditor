const express = require("express");
const notes = require("./data/notes")
const dotenv = require('dotenv');
const  connect  = require("./config/db");
const userRoutes = require('./routes/userRoutes') 
const docRoutes = require('./routes/docRoutes') 
const {notFound, errorHandler} = require ("./middlewares/errorHandlers")
const path = require("path");

const app = express();
dotenv.config();
connect();
app.use(express.json());

// app.get('/',(req,res) =>{
//     res.send("API is running")
// })



app.use('/api/users', userRoutes)
app.use("/api/docs", docRoutes)
//-----------------deployement--------

__dirname = path.resolve();
if(process.env.Node_ENV === 'production'){
   app.use(express.static(path.join(__dirname,"/frontend/build")));

   app.get("*",(req,res)=>{
      res.sendFile(path.resolve(__dirname,"frontend","build","index.html")); 
   });
}else{
    app.get('/',(req,res) =>{
        res.send("API is running")
    })
}
//-----------------deployement--------

app.get("/api/notes/:id",(req,res) =>{
    const note= notes.find((n)=>n._id===req.params.id);
    res.send(note);
})
app.use(notFound);
app.use(errorHandler);

const PORT= process.env.PORT || 5000;

app.listen(PORT,console.log(`Server started on port ${PORT}`));