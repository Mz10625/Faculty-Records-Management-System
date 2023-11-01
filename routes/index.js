const exp = require("constants");
const express = require("express");
const path = require("path");
const fs = require('fs');
const cookieParser = require("cookie-parser");
const admin = require("../controllers/admin");
const user = require("../controllers/user")

const app = express();
const viewsPath = path.dirname(__dirname)+"/views";

const {MongoClient} = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const { validateHeaderName } = require("http");
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
async function close_DB(){
    try{
        await client.close();
    }
    catch{
        console.log("Error disconnecting database!!");
    }
}

app.set("views",viewsPath);
app.use(express.static(viewsPath));
app.use(express.json())//      Data cannot be parsed in json form as it is urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connect_DB();

app.get("/",(req,res)=>{
    // res.status(200).render("home.pug");
    res.sendFile(viewsPath+"/index.html");
})
app.get("/userLogin",(req,res)=>{
    res.sendFile(viewsPath+"/userLogin.html");
})
app.get("/adminLogin",admin.getAdminLogin)

app.get("/adminHome",(req,res)=>{
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
app.get("/downloadFile/:contact/:name",(req,res)=>{
    const contact = req.params.contact;
    const name = req.params.name;
    res.download(__dirname+"/"+contact+"Workshop.xlsx",contact+'Workshop.xlsx', (err) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error downloading the file.');
        }
    });
})
app.get("/downloadAllRecords",(req,res)=>{
    async function processRequest(){
        let userData = await admin.download(client)
        await admin.createWorkshopExcelFile(userData);
        res.download(__dirname+"/Records.xlsx", (err) => {
            if (err) {
            console.error(err);
            res.status(500).send('Error downloading the file.');
            }
        });
    }
})
// app.get("/update",(req,res)=>{
//     admin.checkCookie(client,ObjectId,req.cookies.connectId).then((value)=>{
//         if(value == true){        
//             console.log("T");   
//             // res.sendFile(viewsPath+"/addUser.html");
//             res.render(viewsPath+"/Remove.pug");
//         }
//         else{  
//             res.sendStatus(404);
//         }
//     }) 
// })



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
    let data = req.body;
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
            res.redirect("/adminHome");
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


app.listen(80,"127.0.0.1",()=>{
    console.log("listening...")
})
