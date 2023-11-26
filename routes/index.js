// const exp = require("constants");
require('dotenv').config()
const express = require("express");
const jsonwebtoken = require("jsonwebtoken");
const PORT = process.env.PORT || 80;
const KEY = process.env.SECRET_KEY;
// console.log(process.env)
const path = require("path");
const fs = require('fs');
const cookieParser = require("cookie-parser");
const admin = require("../controllers/admin");
const user = require("../controllers/user")

const app = express();
const viewsPath = path.dirname(__dirname)+"/views";

const {MongoClient} = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const uri =  process.env.URI;
const client = new MongoClient(uri)
async function connect_DB(){
    try{
        await client.connect();
        return true;
    }
    catch{
        console.log("Error connecting database!!");
        return false;
    }
}
connectInterval = setInterval(()=>{
    connect_DB().then((value)=>{
        if(value){
            clearInterval(connectInterval);
        }
    })
},5000)
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
    // console.log(req.body)
    if (!req.body.token) {
        return res.status(401).json(false);
    }    
    try {              
        // const token = authHeader.split(" ")[1];
        // return res.json(true);
        const user = jsonwebtoken.verify(req.body.token,KEY);
        next();
    }catch (error) {
        return res.status(401).json(false);
    }
}

// Admin GET Routes
app.get("/",admin.getIndex)
app.get("/userLogin",admin.getUserLogin)
app.get("/adminLogin",admin.getAdminLogin)

app.get("/adminHome",validateAdminCookie,admin.getAdminHome)
// app.get("/addUser",validateAdminCookie,admin.getAddUser)
app.post("/addUserP",authenticate,validateAdminCookie,admin.getAddUser)
app.post("/updateListP",authenticate,validateAdminCookie,admin.getUpdateList)
app.post("/downloadP",authenticate,validateAdminCookie,admin.getDownload)
app.get("/downloadOneRecord/:contact/:name",validateAdminCookie,admin.getDownloadOneRecord)
// app.get("/downloadConferenceFile/:contact/:name",validateCookie,admin.getDownloadConferenceFile)
app.get("/downloadAllRecords",validateAdminCookie,admin.getDownloadAllRecords)
// app.get("/downloadAllConferenceRecords",validateCookie,admin.getDownloadAllConferenceRecords)
app.post("/removeUserP",authenticate,validateAdminCookie,admin.getRemoveUser)
app.post("/updatePasswordP",authenticate,validateAdminCookie,admin.getUpdatePassword)

// User GET Routes
app.get("/userHome",validateUserCookie,user.getUserHome)
app.post("/workshopP",authenticate,validateUserCookie,user.getWorkshop)
app.post("/conferenceP",authenticate,validateUserCookie,user.getConference)
app.post("/paperPublicationP",authenticate,validateUserCookie,user.getPaperPublication)
app.post("/citationP",authenticate,validateUserCookie,user.getCitation)
app.post("/updateProfileP",authenticate,validateUserCookie,user.getUpdateProfile)
app.post("/downloadUpdateP",authenticate,validateUserCookie,user.getDownloadUpdate)
app.get("/downloadPersonalRecords",validateUserCookie,user.getdownloadPersonalRecords)


app.get("/authenticate",authenticate)
app.get("/logout",(req,res)=>{
    res.clearCookie("connectId");
    res.redirect("/");
})


// Admin POST Routes
app.post("/adminLogin",admin.postAdminLogin)
app.post("/addUser",authenticate,validateAdminCookie,admin.postAddUser)
app.post("/updateList",validateAdminCookie,admin.postUpdateList)
app.post("/updateUserData",validateAdminCookie,admin.postUpdateUserData)
app.post("/download",validateAdminCookie,admin.postDownload)
app.post("/removeUser",authenticate,validateAdminCookie,admin.postRemoveUser)
app.post("/updatePassword",authenticate,validateAdminCookie,admin.postUpdatePassword)



// User POST Routes
app.post("/userLogin",user.postUserLogin)
app.post("/workshop",validateUserCookie,user.postWorkshop)
app.post("/conference",validateUserCookie,user.postConference)
app.post("/paperPublication",validateUserCookie,user.postPaperPublication)
app.post("/citation",validateUserCookie,user.postCitation)
app.post("/updateProfile",validateUserCookie,user.postUpdateProfile)
app.post("/updateWorkshopPage",validateUserCookie,user.postUpdateWorkshopPage)
app.post("/updateConferencePage",validateUserCookie,user.postUpdateConferencePage)
app.post("/updatePaperPublicationPage",validateUserCookie,user.postupdatePaperPublicationPage)
app.post("/updateCitationPage",validateUserCookie,user.postUpdateCitationPage)
app.post("/updateWorkshop",validateUserCookie,user.postupdateWorkshop)
app.post("/updateConference",validateUserCookie,user.postUpdateConference)
app.post("/updatePaperPublication",validateUserCookie,user.postUpdatePaperPublication)
app.post("/updateCitation",validateUserCookie,user.postUpdateCitation)


app.listen(PORT,"127.0.0.1",()=>{
    console.log("listening...")
})
