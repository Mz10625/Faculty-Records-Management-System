
const Excel = require('exceljs');
const path = require("path");
const jsonwebtoken = require("jsonwebtoken");
const viewsPath = path.dirname(__dirname)+"/views";
var client;

function getClientVariable(c){
    client = c;
}
async function adminAuthenticate(u,p){
    try{
        //await client.connect();
        const db = client.db('KITCOEK');
        const adminCollection = db.collection('admin');
        const findResult = await adminCollection.findOne({username:u,password:p});
        if(findResult != null){
            return {flag : true,
                    connectId : findResult._id.toString(), 
                    };
        }
        return {flag : false,
                };
        // const createCollection = await collection.insertOne({"name":1,"age":99});
        //const aggregate = collection.aggregate([{$match:{age:{$gt:50}}}]);
        // const first = await collection.deleteMany();
        // for await (const doc of aggregate) {
        //     console.log(doc);
    }catch(error){
        console.log(error);
    }
    //}
    // finally{
    //     await client.close();
    // }
}
async function checkCookie(ObjectId,reqCookie){
    try{
        // await client.connect();
        const db = client.db('KITCOEK');
        const adminCollection = db.collection('admin');
        let reqCookie_id = new ObjectId(reqCookie);
        const findResult = await adminCollection.findOne({_id : reqCookie_id});
        if(findResult == null){
            return false;
            // console.log("Error thrown")
            // throw new Error("Invalid cookie");
        }
        return true;
    }catch(error){
        console.log(error);
    }
    // finally{
    //     await client.close();
    // }
}
async function addUser(client,data){
    try{
    //     await client.connect();
        const db = client.db('KITCOEK');
        const userCredentials = db.collection('userCredentials');
        let userdata = {"name":data.fname,
                        "email":data.email,
                        "dept":data.dept,
                        "phone":data.phone,
                        "username":data.username,
                        "password":data.password,
        }
        console.log(userdata);
        const insert = await userCredentials.insertOne(userdata,(error,result)=>{
                return result.result.ok;
        });
        return insert;
    }catch(error){
        console.log(error);
    }
    // finally{
    //     client.close();
    // }
}

async function download(client){
    try{

        const db = client.db('KITCOEK');
        const userCredentials = db.collection('userCredentials');
        let doc = await userCredentials.find()
        let list = []
        for await(const x of doc) {        
            list.push(x);
        }
        // console.log(userdata[1])
        return {value:true,userdata:list,};
    }catch(error){
        console.log(error);
    }
}
async function getDataToUpdate(client,contact){
    try{

        const db = client.db('KITCOEK');
        const userCredentials = db.collection('userCredentials');
        let data = await userCredentials.findOne({phone : contact});
        
        if(data != null){
            return {value:true,userdata:data,};
        }
        return {value:false,userdata:null,};
    }catch(error){
        console.log(error);
    }
}
async function updateUserData(client,ObjectId,updatedData){
    try{

        const db = client.db('KITCOEK');
        const userCredentials = db.collection('userCredentials');
        let reqId = new ObjectId(updatedData._id)
        let updateResult =await userCredentials.updateOne(
            {_id : reqId},
            {$set :{
                name : updatedData.name,
                phone : updatedData.phone,
                email : updatedData.email,
                dept : updatedData.dept,
                username : updatedData.username,
                password : updatedData.password,
            }}
            )
            if(updateResult.acknowledged){
                return {value:true,userdata:updateResult}
            }
            return {value:false,userdata:null}
    }catch(error){
        console.log(error);
    }
}

async function createExcelFile(data){
    try{
        
        const workshopWb = new Excel.Workbook();
        const workshopWs = workshopWb.addWorksheet('Workshop Sheet');
    let headers = [
        { header: 'Faculty name', key: 'facultyName', width: 20 },
        { header: 'Faculty Designation', key: 'facultyDesignation', width: 20 },
        { header: 'Faculty Department', key: 'facultyDept', width: 20 },
        { header: 'Workshop Name', key: 'workshopName', width: 20 },
        { header: 'Organizing Institute', key: 'orgInstitute', width: 20 },
        { header: 'Venue', key: 'venue', width: 20 },
        { header: 'nature', key: 'nature', width: 20 },
        { header: 'Duration', key: 'duration', width: 20},
        { header: 'Start date', key: 'startDate', width: 20 },
        { header: 'End date', key: 'endDate', width: 20 },
        { header: 'Financial support', key: 'financialSupport', width: 20 },
        { header: 'Financial support Organisation', key: 'financeSupportOrganisation', width: 20 },
        { header: 'Financial support amount', key: 'amount', width: 20 },
    ]
    workshopWs.columns = headers; 

    const conferenceWb = new Excel.Workbook();
    const conferenceWs = conferenceWb.addWorksheet('Conference Sheet');
    headers = [
        { header: 'Faculty name', key: 'facultyName', width: 20 },
        { header: 'Faculty Designation', key: 'facultyDesignation', width: 20 },
        { header: 'Faculty Department', key: 'facultyDept', width: 20 },
        { header: 'Author Or Co-author', key: 'selectAuthorOrCo', width: 20 },
        { header: 'First Author', key: 'firstAuth', width: 20 },
        { header: 'Co-Author-1', key: 'CoAuth1', width: 20 },
        { header: 'Co-Author-2', key: 'CoAuth2', width: 20 },
        { header: 'Co-Author-3', key: 'CoAuth3', width: 20 },
        { header: 'Title of Paper', key: 'paperTitle', width: 20 },
        { header: 'Conference Name', key: 'confName', width: 20},
        { header: 'International or National', key: 'InternationalOrnot', width: 20 },
        { header: 'Name of Organizing Institute', key: 'orgInstitute', width: 20 },
        { header: 'ISSN or e-ISSN Number', key: 'issn', width: 20 },
        { header: 'Volume Number', key: 'volName', width: 20 },
        { header: 'Page No [From-To]', key: 'pageNo', width: 20 },
        { header: 'Date of Conference', key: 'confDate', width: 20 },
        { header: 'Indexing (like Scopus, SCI, Web of Science etc)', key: 'indexing', width: 20 },
        { header: 'Number of Citation', key: 'citationNum', width: 20 },
        { header: 'Issue', key: 'issue', width: 20 },
        { header: 'Upload Certificate (GDrive Link)', key: 'certificateLink', width: 20 },
        { header: 'Peresented/published', key: 'peresentedPublished', width: 20 },
        { header: 'Any Financial Support', key: 'financeSupport', width: 20 },
        { header: 'Financial support Organisation', key: 'financeSupportOrganisation', width: 20 },
        { header: 'Financial support amount', key: 'amount', width: 20 },
    ]
    conferenceWs.columns = headers; 
    
    for(let i=0; i<data.length; i++){
        let workshopdata = data[i].workshop;
        let confData = data[i].conference;
        if(workshopdata != null){
            workshopWs.addRow([workshopdata.facultyName,workshopdata.facultyDesignation,workshopdata.facultyDept,
                workshopdata.workshopName,workshopdata.orgInstitute,workshopdata.venue,workshopdata.nature,
                workshopdata.duration,workshopdata.startDate,workshopdata.endDate,workshopdata.financialSupport,
                workshopdata.financeSupportOrganisation,workshopdata.amount
            ]);
        }
        if(confData != null){
            conferenceWs.addRow([confData.facultyName,confData.facultyDesignation,confData.facultyDept,
                confData.authorCoAuthor,confData.firstAuthor,confData.coAuthor1,confData.coAuthor2,
                confData.coAuthor3,confData.title,confData.conferenceName,confData.nationalOrInternational,
                confData.organizingInstitute,confData.issnNo,confData.volumes,confData.pageNo,confData.date,confData.indexing,
                confData.citationsNo,confData.issue,confData.link,confData.presentedPublished,confData.financialSupport,confData.financeSupportOrganisation,
                confData.amount
            ]);
        }
    }
    let newWorkshopFileName,newConferenceFileName;

    if(data.length==1){
        newWorkshopFileName = "/"+data[0].phone+'Workshop.xlsx';
        newConferenceFileName =  "/"+data[0].phone+'Conference.xlsx';
    }
    else{
        newWorkshopFileName = '/Workshop.xlsx';
        newConferenceFileName = '/Conference.xlsx';
    }
    workshopWb.xlsx.writeFile( path.dirname(__dirname)+"/routes"+newWorkshopFileName)
            // .then(() => {
            //     return true;
            // })
            .catch(err => {
                console.log(err.message);
            });
    conferenceWb.xlsx.writeFile( path.dirname(__dirname)+"/routes"+newConferenceFileName)
    // .then(() => {
        //     return true;
            // })
            .catch(err => {
                console.log(err.message);
            });

    }catch(error){
        console.log(error);
    }

}
async function removeUser(client,ObjectId,id){
    const db = client.db('KITCOEK');
    const userCredentials = db.collection('userCredentials');
    const reqId = new ObjectId(id);
    const result = await userCredentials.deleteOne({_id:reqId});
    return result.deletedCount;
}




function getAdminLogin(req,res){
    res.sendFile(viewsPath+"/adminLogin.html");
}
function getIndex(req,res){
    res.sendFile(viewsPath+"/index.html");
}
function getUserLogin(req,res){
    res.sendFile(viewsPath+"/userLogin.html");
}
function getAdminHome(req,res){   
    try{
        const token = req.cookies.token;
        const verify = jsonwebtoken.verify(token,"12345");
    }catch(error){
        console.log(error);
    }
    res.sendFile(viewsPath+"/adminHome.html");
}
function getAddUser(req,res){
    res.sendFile(viewsPath+"/addUser.html");
}
function getDownload(req,res){
    download(client).then((value)=>{
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
}
function getUpdateList(req,res){
    download(client).then((value)=>{
        if(value){
            res.render(viewsPath+"/updateList.pug",{userdata:value.userdata});
        }
        else{
            res.sendStatus(404);
        }
    })
}
function getDownloadWorkshopFile(req,res){
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
}
function getDownloadConferenceFile(req,res){
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
}
function getDownloadAllWorkshopRecords(req,res){
    const requestedFilePath = __dirname+"/Workshop.xlsx";
    async function processRequest(){
        let value = await download(client)
        await createExcelFile(value.userdata);
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
}
function getDownloadAllConferenceRecords(req,res){
    const requestedFilePath = __dirname+"/Conference.xlsx";
    res.download(requestedFilePath,"Conference.xlsx", (err) => {
        if (err) {
        console.error(err);
        res.status(500).send('Error downloading the file.');
        }
    });     
}
function getRemoveUser(req,res){
    download(client).then((value)=>{                
        if(value){
            res.render(viewsPath+"/Remove.pug",{userdata:value.userdata});
        }
        else{
            res.sendStatus(404);
        }
    })
}
function postAdminLogin(req,res){
    let data = (req.body);
    adminAuthenticate(data.UserName,data.Password).then((value)=>{
        if(value.flag == true){
            res.cookie(`connectId`,value.connectId,
            {
                maxAge: 1800000,
                secure: true,
                httpOnly: true,
                // sameSite: 'lax'
            });
            res.cookie(`token`, jsonwebtoken.sign({ pass: data.Password}, "12345"), 
            {
                maxAge: 1800000,
                secure: true,
                // httpOnly: true,
                // sameSite: 'lax'
            });
            // res.json({
            //     token: jsonwebtoken.sign({ pass: data.Password}, "12345"),               
            // })
            res.redirect("/adminHome");
        }
        else{
            res.redirect("/adminLogin");
        }
    }) 
}
function postAddUser(req,res){
    let data = req.body;
    addUser(client,data).then((value)=>{
        if(value){
            res.redirect("/addUser"); 
        }
        else{
            res.sendStatus(417);
        }
    })
}
function postUpdateList(req,res){
    let data = req.body;
    getDataToUpdate(client,data.contact).then((value)=>{
        if(value.value){
            res.render(viewsPath+"/update.pug",{data:value.userdata}); 
        }
        else{
            res.sendStatus(417);
        }
    })
}
function postUpdateUserData(req,res){
    let data = req.body;
    updateUserData(client,ObjectId,data).then((value)=>{
        if(value.value){
            res.redirect("/updateList"); 
        }
        else{
            res.sendStatus(417);
        }
    })
}
function postDownload(req,res){
    let data=JSON.parse(req.body.jsonData);
    let dataToList = [data];
    // dataToList.push(data)
    // let parsedData = JSON.parse(data.jsonData);
    // console.log(typeof(parsedData));
    admin.createExcelFile(dataToList);
}
function postRemoveUser(req,res){
    let data=req.body;
    removeUser(client,ObjectId,data.jsonData).then((value)=>{
        if(value==1){
            res.redirect("/removeUser");
        }
        else{
            res.sendStatus(404);
        }
    });
}




module.exports = {
    // adminAuthenticate : authenticate,
    // checkCookie : checkCookie,
    // addUser : addUser,
    // download : download,
    // getDataToUpdate :getDataToUpdate ,
    // updateUserData : updateUserData,
    // createExcelFile : createExcelFile,
    // removeUser : removeUser,
    getClientVariable : getClientVariable,
    getAdminLogin : getAdminLogin,
    getIndex : getIndex,
    getUserLogin : getUserLogin,
    getAdminHome : getAdminHome,
    getAddUser : getAddUser,
    getDownload : getDownload,
    getUpdateList : getUpdateList,
    getDownloadWorkshopFile : getDownloadWorkshopFile,
    getDownloadConferenceFile : getDownloadConferenceFile,
    getDownloadAllWorkshopRecords : getDownloadAllWorkshopRecords,
    getDownloadAllConferenceRecords : getDownloadAllConferenceRecords,
    getRemoveUser : getRemoveUser,
    postAdminLogin : postAdminLogin,
    postAddUser : postAddUser,
    postUpdateList : postUpdateList,
    postUpdateUserData : postUpdateUserData,
    postDownload : postDownload,
    postRemoveUser : postRemoveUser,
}