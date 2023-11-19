// const exp = require("constants");
const express = require("express");
const jsonwebtoken = require("jsonwebtoken");

const path = require("path");
const fs = require('fs');
const cookieParser = require("cookie-parser");
const admin = require("../controllers/admin");
const user = require("../controllers/user")

const app = express();
const viewsPath = path.dirname(__dirname)+"/views";

const {MongoClient} = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
// const { checkCookie } = require("../controllers/admin");
// const { validateHeaderName } = require("http");
const uri = "mongodb+srv://suyashnalawade001:mongo0104atlas@cluster0.t7roaby.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(uri)
async function connect_DB(){
    try{
        await client.connect();
    }
    catch{
        console.log("Error connecting database!!");
    }
}

// async function close_DB(){
//     try{
//         await client.close();
//     }
//     catch{
//         console.log("Error disconnecting database!!");
//     }
// }

app.set("views",viewsPath);
app.use(express.static(viewsPath));
app.use(express.json())//      Data cannot be parsed in json form as it is urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connect_DB();
admin.getClientVariable(client);
user.getClientVariable(client);

const validateAdminCookie =  (req,res,next)=>{
   async function validate(){
        try{
            let isValid = await admin.checkCookie(ObjectId,req.cookies.connectId)
            if(isValid==true){
                next();
            }
            else{
                throw new Error("Invalid Cookie");
            }
        }catch (error) {
            return res.status(401).send("Not Authorized");
        }
    }
    validate();
}
const validateUserCookie =  (req,res,next)=>{
   async function validate(){
        try{
            let isValid = await user.checkCookie(ObjectId,req.cookies.connectId)
            if(isValid==true){
                next();
            }
            else{
                throw new Error("Invalid Cookie");
            }
        }catch (error) {
            return res.status(401).send("Not Authorized");
        }
    }
    validate();
}

const authenticate = (req,res,next)=>{
    if (!req.headers.authorization) {
        return res.status(401).json(false);
    }    
    try {              
        const authHeader = req.headers.authorization;    
        const token = authHeader.split(" ")[1];
        const user = jsonwebtoken.verify(token,"12345");
        return res.json(true);
        // next();
    }catch (error) {
        return res.status(401).json(false);
    }
}

// Admin GET Routes
app.get("/",admin.getIndex)
app.get("/userLogin",admin.getUserLogin)
app.get("/adminLogin",admin.getAdminLogin)
app.get("/adminHome",validateAdminCookie,admin.getAdminHome)
app.get("/addUser",validateAdminCookie,admin.getAddUser)
app.get("/download",validateAdminCookie,admin.getDownload)
app.get("/updateList",validateAdminCookie,admin.getUpdateList)
app.get("/downloadOneRecord/:contact/:name",validateAdminCookie,admin.getDownloadOneRecord)
// app.get("/downloadConferenceFile/:contact/:name",validateCookie,admin.getDownloadConferenceFile)
app.get("/downloadAllRecords",validateAdminCookie,admin.getDownloadAllRecords)
// app.get("/downloadAllConferenceRecords",validateCookie,admin.getDownloadAllConferenceRecords)
app.get("/removeUser",validateAdminCookie,admin.getRemoveUser)

// User GET Routes
app.get("/userHome",validateUserCookie,user.getUserHome)
app.get("/workshop",validateUserCookie,user.getWorkshop)
app.get("/conference",validateUserCookie,user.getConference)


app.get("/authenticate",authenticate)
app.get("/logout",(req,res)=>{
    res.clearCookie("connectId");
    res.redirect("/");
})


// Admin POST Routes
app.post("/adminLogin",admin.postAdminLogin)
app.post("/addUser",validateAdminCookie,admin.postAddUser)
app.post("/updateList",validateAdminCookie,admin.postUpdateList)
app.post("/updateUserData",validateAdminCookie,admin.postUpdateUserData)
app.post("/download",validateAdminCookie,admin.postDownload)
app.post("/removeUser",validateAdminCookie,admin.postRemoveUser)

// User POST Routes
app.post("/userLogin",user.postUserLogin)
app.post("/workshop",validateUserCookie,user.postWorkshop)
app.post("/conference",validateUserCookie,user.postConference)


app.listen(80,"127.0.0.1",()=>{
    console.log("listening...")
})
