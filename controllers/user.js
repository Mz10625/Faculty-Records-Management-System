const jsonwebtoken = require("jsonwebtoken");
const path = require("path");
const viewsPath = path.dirname(__dirname)+"/views";
const ObjectId = require('mongodb').ObjectId;
var client,redirected=false;


function getClientVariable(c){
    client = c;
}

async function userAuthenticate(u,p){
    const db = client.db('KITCOEK');
    const userCollection = db.collection('userCredentials');
    const findResult = await userCollection.findOne({username:u,password:p});
    if(findResult != null){
        return {flag : true,
                connectId : findResult._id.toString(), 
                };
    }
    return {flag : false,};
}
async function checkCookie(ObjectId,reqCookie){
        const db = client.db('KITCOEK');
        const userCollection = db.collection('userCredentials');
        let reqCookie_id = new ObjectId(reqCookie);
        const findResult = await userCollection.findOne({_id : reqCookie_id});
        if(findResult != null){
            return true;
        }
        return false;
}
async function addWorkshopData(client,data,ObjectId,reqCookie){
    const db = client.db('KITCOEK');
    const userCollection = db.collection('userCredentials');
    // console.log(data);
    let workshopData = {"facultyName":data.fName,
                        "facultyDesignation": data.desig,
                        "facultyDept":data.dept,
                        "workshopName":data.workshopName,
                        "orgInstitute":data.institute,
                        "venue":data.venue,
                        "nature":data.nature,
                        "duration":data.duration,
                        "startDate":data.startDate,
                        "endDate":data.endDate,
                        "financialSupport":data.support,
                        "financeSupportOrganisation":data.supportOrg,
                        "amount":data.amount,                        
    }
    let reqCookie_id = new ObjectId(reqCookie);
    const findResult =  await userCollection.findOne({_id : reqCookie_id});
    let workshop = findResult.workshop;
    if(workshop){
        let workshopCount = (Object.keys(workshop).length) + 1;
        workshop[workshopCount.toString()] = workshopData;
    }
    else{
        workshop ={"1" : workshopData};
    }
    const updateResult = await userCollection.updateOne(
        {_id : reqCookie_id},
        {$set :{workshop : workshop}}
    );
    if(updateResult != null){
        return true;
    }
    return false;
}

async function addConferenceData(data,reqCookie){
    const db = client.db('KITCOEK');
    const userCollection = db.collection('userCredentials');
    // console.log(data);
    let conferenceData = {"facultyName":data.fName,
                        "facultyDesignation": data.desig,
                        "facultyDept":data.dept,
                        "authorCoAuthor":data.authorOrCo,
                        "firstAuthor":data.firstAuthor,
                        "coAuthor1":data.coAuthor1,
                        "coAuthor2":data.coAuthor2,
                        "coAuthor3":data.coAuthor3,
                        "title":data.title,
                        "conferenceName":data.confName,
                        "nationalOrInternational":data.nationalOrInter,
                        "organizingInstitute":data.institute,
                        "issnNo":data.issnNo,
                        "volumes":data.volumes,
                        "pageNo":data.pageNo,
                        "date":data.date,
                        "indexing":data.indexing,
                        "citationsNo":data.citationsNo,
                        "issue":data.issue,
                        "link":data.link,
                        "presentedPublished":data.presentedPub,
                        "financialSupport":data.support,
                        "financeSupportOrganisation":data.supportOrg,
                        "amount":data.amount,                        
    }
    let reqCookie_id = new ObjectId(reqCookie);
    const findResult =  await userCollection.findOne({_id : reqCookie_id});
    let conference = findResult.conference;
    if(conference){
        let conferenceCount = (Object.keys(conference).length) + 1;
        conference[conferenceCount.toString()] = conferenceData;
    }
    else{
        conference ={"1" : conferenceData};
    }
    const updateResult = await userCollection.updateOne(
        {_id : reqCookie_id},
        {$set :{conference : conference}}
    );
    if(updateResult != null){
        return true;
    }
    return false;
}

function getUserHome(req,res){
    try{
        if(redirected==true){
            const token = req.cookies.token;
            const verify = jsonwebtoken.verify(token,"12345");
            redirected = false;
        }
        res.sendFile(viewsPath+"/userHome.html");
    }catch(error){
        console.log(error)
        // return res.status(401).send( "Not Authorized");
    }  
}
function getWorkshop(req,res){
    res.sendFile(viewsPath+"/workshop.html"); 
}
function getConference(req,res){
    res.sendFile(viewsPath+"/conference.html"); 
}
function postUserLogin(req,res){
    let data = (req.body);
    userAuthenticate(data.UserName,data.Password).then((value)=>{
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
            });
            redirected = true;
            res.redirect("/userHome");
        }
        else{
            res.redirect("/userLogin");
        }
    })
}
function postWorkshop(req,res){
    let data = req.body;
    // console.log(data);
    addWorkshopData(client,data,ObjectId,req.cookies.connectId).then((value)=>{
        if(value){
            res.redirect("/workshop"); 
        }
        else{
            res.sendStatus(417);
        }
    })
}

function postConference(req,res){
    let data = req.body;
    // console.log(data);
    addConferenceData(data,req.cookies.connectId).then((value)=>{
        if(value){
            res.redirect("/conference"); 
        }
        else{
            res.sendStatus(417);
        }
    })
}

module.exports = {
    // userAuthenticate : authenticate,
    checkCookie : checkCookie,
    // addWorkshopData : addWorkshopData,
    // addConferenceData : addConferenceData,
    getClientVariable : getClientVariable,
    getUserHome : getUserHome,
    getWorkshop : getWorkshop,
    getConference : getConference,
    postUserLogin : postUserLogin,
    postWorkshop : postWorkshop,
    postConference : postConference,
}