import express from "express";
import usersRoute from "./routes/user.js";

const app = express();


//express.json()
app.use(express.json());

//if the user types /users then go to user.js

function maintenance(req,res,next){
    res.send("Site under maintenence come back tomorrow");
}
//app.use(maintenance);

app.use(express.static('public'));

app.use(express.urlencoded());

//app-level custom middleware
app.use((req,res,next) => {
    //logging all requests
        console.log(`${req.method} ${req.url} recieved at ${new Date().getTime()}`);
        next(); //forces the request to go to the next stage
});

app.use((req,res,next) =>{
    setTimeout(() =>  {
        next();
    }, 2000);
})
 



app.use('/user', usersRoute);
// route level

app.listen(3000, () => console.log("Server running on port 3000"));