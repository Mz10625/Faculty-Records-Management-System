const exp = require("constants");
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
const authenticate = function  (req,req,next){
    console.log(req);
    /*if (!req.headers.authorization) {
        return res.status(401).json({ error: "Not Authorized" });
    }
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];
    try {       
        const { user } = jwt.verify(token,"12345-");
        next();
    }catch (error) {
        return res.status(401).json({ error: "Not Authorized" });
    }*/
}

app.get("/",(req,res)=>{
    // res.status(200).render("home.pug");
    res.sendFile(viewsPath+"/index.html");
})
app.get("/userLogin",(req,res)=>{
    res.sendFile(viewsPath+"/userLogin.html");
})
app.get("/adminLogin",admin.getAdminLogin)

app.get("/adminHome",authenticate,(req,res)=>{
    admin.checkCookie(client,ObjectId,req.cookies.connectId).then((value)=>{
        if(value == true){
            res.sendFile(viewsPath+"/adminHome.html");
        }
        else{
            res.sendStatus(404);
        }
    })  
})

app.get("/userHome",(req,res)=>{
    user.checkUserCookie(client,ObjectId,req.cookies.connectId).then((value)=>{
        if(value == true){
            res.sendFile(viewsPath+"/userHome.html");
        }
        else{
            res.sendStatus(404);
        }
    })    
})
app.get("/workshop",(req,res)=>{
    user.checkUserCookie(client,ObjectId,req.cookies.connectId).then((value)=>{
        if(value == true){
            res.sendFile(viewsPath+"/workshop.html");
        }
        else{
            res.sendStatus(404);
        }
    })    
})
app.get("/conference",(req,res)=>{
    user.checkUserCookie(client,ObjectId,req.cookies.connectId).then((value)=>{
        if(value == true){
            res.sendFile(viewsPath+"/conference.html");
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
    admin.checkCookie(client,ObjectId,req.cookies.connectId).then((value)=>{
        if(value == true){
            
            res.sendFile(viewsPath+"/addUser.html");
        }
        else{
            res.sendStatus(404);
        }
    }) 
})
app.get("/download",(req,res)=>{
    admin.download(client).then((value)=>{
        // for (each value.userdata) {
        //     console.log(x);
        // }
        // console.log();
        if(value){
            res.render(viewsPath+"/Download.pug",{userdata:value.userdata});
        }
        else{
            res.sendStatus(404);
        }
    })
})
app.get("/updateList",(req,res)=>{
    admin.download(client).then((value)=>{
        if(value){
            res.render(viewsPath+"/updateList.pug",{userdata:value.userdata});
        }
        else{
            res.sendStatus(404);
        }
    })
})
app.get("/downloadWorkshopFile/:contact/:name",(req,res)=>{
    const contact = req.params.contact;
    const name = req.params.name;
    const requestedFilePath = __dirname+"/"+contact+"Workshop.xlsx";
    // var requestedFile = new File(requestedFilePath);
    // while(!requestedFile.exists())
    res.download(requestedFilePath,name+'Workshop.xlsx', (err) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error downloading the file.');
        }
    });
})
app.get("/downloadConferenceFile/:contact/:name",(req,res)=>{
    const contact = req.params.contact;
    const name = req.params.name;
    const requestedFilePath = __dirname+"/"+contact+"Conference.xlsx";
    // var requestedFile = new File(requestedFilePath);
    // while(!requestedFile.exists())
    res.download(requestedFilePath,name+'Conference.xlsx', (err) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error downloading the file.');
        }
    });
})
app.get("/downloadAllWorkshopRecords",(req,res)=>{
    const requestedFilePath = __dirname+"/Workshop.xlsx";
    async function processRequest(){
        let value = await admin.download(client)
        await admin.createExcelFile(value.userdata);
        return true;
    }
    processRequest()
    setTimeout(()=>{
        res.download(requestedFilePath,"Workshop.xlsx", (err) => {
            if (err) {
            console.error(err);
            res.status(500).send('Error downloading the file.');
            }
        });
    },4000)       
})
app.get("/downloadAllConferenceRecords",(req,res)=>{
    const requestedFilePath = __dirname+"/Conference.xlsx";
    res.download(requestedFilePath,"Conference.xlsx", (err) => {
        if (err) {
        console.error(err);
        res.status(500).send('Error downloading the file.');
        }
    });     
})
app.get("/removeUser",(req,res)=>{
    admin.checkCookie(client,ObjectId,req.cookies.connectId).then((value)=>{
        if(value == true){           
            admin.download(client).then((value)=>{                
                if(value){
                    res.render(viewsPath+"/Remove.pug",{userdata:value.userdata});
                }
                else{
                    res.sendStatus(404);
                }
            })
        }
        else{  
            res.sendStatus(404);
        }
    }) 
})



app.post("/userLogin",(req,res)=>{
    let data = req.body
    //res.status(200).render("index.pug");
    user.userAuthenticate(client,data.UserName,data.Password).then((value)=>{
        if(value.flag == true){
            res.cookie(`connectId`,value.connectId,
            {
                maxAge: 1800000,
                secure: true,
                httpOnly: true,
                // sameSite: 'lax'
            }
            );
            res.redirect("/userHome");
        }
        else{
            res.redirect("/userLogin");
        }
    }) 
})


app.post("/adminLogin",(req,res)=>{
    let data = (req.body);
    admin.adminAuthenticate(client,data.UserName,data.Password).then((value)=>{
        if(value.flag == true){
            res.cookie(`connectId`,value.connectId,
            {
                maxAge: 1800000,
                secure: true,
                httpOnly: true,
                // sameSite: 'lax'
            }
            );
            return res.json({
                token: jsonwebtoken.sign({ pass: data.Password}, "12345"),
                nextUrl : "/adminHome",
            })
        }
        else{
            res.redirect("/adminLogin");
        }
    }) 
})
app.post("/addUser",(req,res)=>{
    let data = req.body;
    admin.addUser(client,data).then((value)=>{
        if(value){
            res.redirect("/addUser"); 
        }
        else{
            res.sendStatus(417);
        }
    })
})
app.post("/workshop",(req,res)=>{
    let data = req.body;
    user.addWorkshopData(client,data,ObjectId,req.cookies.connectId).then((value)=>{
        if(value){
            res.redirect("/workshop"); 
        }
        else{
            res.sendStatus(417);
        }
    })
})
app.post("/conference",(req,res)=>{
    let data = req.body;
    console.log(data);
    user.addConferenceData(client,data,ObjectId,req.cookies.connectId).then((value)=>{
        if(value){
            res.redirect("/conference"); 
        }
        else{
            res.sendStatus(417);
        }
    })
})

app.post("/updateList",(req,res)=>{
    let data = req.body;
    admin.getDataToUpdate(client,data.contact).then((value)=>{
        if(value.value){
            res.render(viewsPath+"/update.pug",{data:value.userdata}); 
        }
        else{
            res.sendStatus(417);
        }
    })
})
app.post("/updateUserData",(req,res)=>{
    let data = req.body;
    admin.updateUserData(client,ObjectId,data).then((value)=>{
        if(value.value){
            res.redirect("/updateList"); 
        }
        else{
            res.sendStatus(417);
        }
    })
})

app.post("/download",(req,res)=>{
    let data=JSON.parse(req.body.jsonData);
    let dataToList = [data];
    // dataToList.push(data)
    // let parsedData = JSON.parse(data.jsonData);
    // console.log(typeof(parsedData));
    admin.createExcelFile(dataToList);
})
app.post("/removeUser",(req,res)=>{
    let data=req.body;
    
    admin.removeUser(client,ObjectId,data.jsonData).then((value)=>{
        if(value==1){
            res.redirect("/removeUser");
        }
        else{
            res.sendStatus(404);
        }
    });
})

app.listen(80,"127.0.0.1",()=>{
    console.log("listening...")
})
