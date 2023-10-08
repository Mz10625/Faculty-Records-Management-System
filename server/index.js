const exp = require("constants");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const admin = require("./admin");

const app = express();
const viewsPath = path.dirname(__dirname)+"/views";


app.set("views",viewsPath);
app.use(express.static(viewsPath));
// app.use(express.json())      Data cannot be parsed in json form as it is urlencoded
app.use(express.urlencoded());
app.use(cookieParser());


app.get("/",(req,res)=>{
    // res.status(200).render("home.pug");
    res.sendFile(viewsPath+"/index.html");
})
app.get("/userLogin",(req,res)=>{
    res.sendFile(viewsPath+"/userLogin.html");
})
app.get("/adminLogin",(req,res)=>{
    res.sendFile(viewsPath+"/adminLogin.html");
})
app.get("/adminHome",(req,res)=>{
    // console.log((req.cookies));
    admin.checkCookie(req.cookies.connectId).then((value)=>{
        if(value == true){
            res.sendFile(viewsPath+"/adminHome.html");
        }
        else{
            res.sendStatus(404);
        }
    })    
})
app.get("/logout",(req,res)=>{
    res.clearCookie("connectId");
    res.redirect("/");
})
app.get("/addUser",(req,res)=>{
    admin.checkCookie(req.cookies.connectId).then((value)=>{
        if(value == true){
            res.sendFile(viewsPath+"/addUser.html");
        }
        else{
            res.sendStatus(404);
        }
    }) 
})




app.post("/userLogin",(req,res)=>{
    let data = req.body
    //res.status(200).render("index.pug");
    res.redirect("/");
})
app.post("/adminLogin",(req,res)=>{
    let data = req.body;
    admin.adminAuthenticate(data.UserName,data.Password).then((value)=>{
        if(value.flag == true){
            res.cookie(`connectId`,value.connectId,
            {
                maxAge: 1800000,
                secure: true,
                httpOnly: true,
                // sameSite: 'lax'
            }
            );
            res.redirect("/adminHome");
        }
        else{
            res.redirect("/adminLogin");
        }
    }) 
})
app.post("/addUser",(req,res)=>{
    let data = req.body;
    admin.addUser(data).then((value)=>{
        if(value){
            res.redirect("/addUser"); 
        }
        else{
            res.sendStatus(417);
        }
    })
})




app.listen(80,"127.0.0.1",()=>{
    console.log("listening...")
})
