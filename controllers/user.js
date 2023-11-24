const jsonwebtoken = require("jsonwebtoken");
const path = require("path");
const fs = require('fs');
const viewsPath = path.dirname(__dirname)+"/views";
const ObjectId = require('mongodb').ObjectId;
const admin = require("../controllers/admin");
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
async function addPaperPublicationData(data,reqCookie){
    const db = client.db('KITCOEK');
    const userCollection = db.collection('userCredentials');
    // console.log(data);
    let PaperPublicationData = {"facultyName":data.fName,
                        "facultyDesignation": data.desig,
                        "facultyDept":data.dept,
                        "authorCoAuthor":data.authorOrCo,
                        "firstAuthor":data.firstAuthor,
                        "coAuthor1":data.coAuthor1,
                        "coAuthor2":data.coAuthor2,
                        "coAuthor3":data.coAuthor3,
                        "title":data.title,         
                        "journal":data.journalName,   
                        "nationalOrInternational":data.nationalOrInter,
                        "issnNo":data.issnNo,
                        "volumes":data.volumes,
                        "issue":data.issue,
                        "pageNo":data.pageNo,
                        "publicationMonth":data.publicationMonth,
                        "publicationYear":data.publicationYear,
                        "indexing":data.indexing,
                        "impactFactor":data.impactFactor,
                        "citationsNo":data.citationsNo,
                        "hIndex":data.hIndex,
                        "i10Index":data.i10Index,
                        "financialSupport":data.support,
                        "financeSupportOrganisation":data.supportOrg,
                        "amount":data.amount,                        
                        "link":data.link,
    }
    let reqCookie_id = new ObjectId(reqCookie);
    const findResult =  await userCollection.findOne({_id : reqCookie_id});
    let paperPublication = findResult.paperPublication;
    if(paperPublication){
        let paperPublicationCount = (Object.keys(paperPublication).length) + 1;
        paperPublication[paperPublicationCount.toString()] = PaperPublicationData;
    }
    else{
        paperPublication ={"1" : PaperPublicationData};
    }
    const updateResult = await userCollection.updateOne(
        {_id : reqCookie_id},
        {$set :{paperPublication : paperPublication}}
    );
    if(updateResult != null){
        return true;
    }
    return false;
}
async function addCitationData(data,reqCookie){
    const db = client.db('KITCOEK');
    const userCollection = db.collection('userCredentials');
    // console.log(data);
    let citationData = {"facultyName":data.fName,
                        "facultyDesignation": data.desig,
                        "facultyDept":data.dept,
                        "authorCoAuthor":data.authorOrCo,
                        "firstAuthor":data.firstAuthor,
                        "coAuthor1":data.coAuthor1,
                        "coAuthor2":data.coAuthor2,
                        "coAuthor3":data.coAuthor3,
                        "title":data.title,
                        "indexing":data.indexing,
                        "year":data.year,
                        "citedBy":data.citedBy,
                        "hIndex":data.hIndex,
                        "i10Index":data.i10Index,
    }
    let reqCookie_id = new ObjectId(reqCookie);
    const findResult =  await userCollection.findOne({_id : reqCookie_id});
    let citation = findResult.citation;
    if(citation){
        let citationCount = (Object.keys(citation).length) + 1;
        citation[citationCount.toString()] = citationData;
    }
    else{
        citation ={"1" : citationData};
    }
    const updateResult = await userCollection.updateOne(
        {_id : reqCookie_id},
        {$set :{citation : citation}}
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
function getPaperPublication(req,res){
    res.sendFile(viewsPath+"/PaperPublication.html"); 
}
function getCitation(req,res){
    res.sendFile(viewsPath+"/citation.html"); 
}
async function getUpdateProfile(req,res){
    try{
        const db = client.db('KITCOEK');
        const userCollection = db.collection('userCredentials');
        reqCookie = req.cookies.connectId;
        let reqCookie_id = new ObjectId(reqCookie);
        const findResult = await userCollection.findOne({_id : reqCookie_id});
        if(findResult == null){
            throw new Error("User record not found");
        }
        findResult.workshop = -1;
        findResult.conference = -1;
        // console.log(findResult)
        res.render(viewsPath+"/updateUserProfile.pug",{data : findResult});
    }catch(error){
        console.log(error);
        res.redirect("/userHome");
    }
}
async function getDownloadUpdate(req,res){
    try{
        const db = client.db('KITCOEK');
        const userCredentials = db.collection('userCredentials');
        let reqId = new ObjectId(req.cookies.connectId);
        let findResult = await userCredentials.findOne({_id : reqId})
        if(findResult == null){
            throw new Error("User not found!!");
        }
        findResult.password = -1;
        if(findResult.workshop==null){
            findResult["workshop"] = -1
        }
        if(findResult.conference==null){
            findResult["conference"] = -1
        }
        if(findResult.paperPublication==null){
            findResult["paperPublication"] = -1
        }
        if(findResult.citation==null){
            findResult["citation"] = -1
        }
        res.render(viewsPath+"/downloadUpdateList.pug",{userdata : findResult});
    }catch(error){
        console.log(error);
        res.send("Failed to update Details");
    }
}
async function getdownloadPersonalRecords(req,res){
    try{
        const db = client.db('KITCOEK');
        const userCredentials = db.collection('userCredentials');
        let reqId = new ObjectId(req.cookies.connectId);
        let findResult = await userCredentials.findOne({_id : reqId})
        if(findResult == null){
            throw new Error("User not found!!");
        }
        findResult.password = -1;
        listData = [findResult]
        const requestedFilePath = path.dirname(__dirname)+"/routes/"+findResult.phone+".zip";
        admin.createExcelFile(listData,1)
        fileCreationIterval = setInterval(() => {
            const exists = fs.existsSync(requestedFilePath)
            if (exists) {
                res.download(requestedFilePath,"Records.zip", (err) => {
                    if (err) {
                    console.error(err);
                    res.status(500).send('Error downloading the file.');
                    }
                })
                res.on("finish",()=>{
                    admin.deleteFiles(requestedFilePath);                                        
                })
                clearInterval(fileCreationIterval);
            }
        }, 1000);
    }catch(error){
        console.log(error);
        res.send("Failed");
    }
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
function postPaperPublication(req,res){
    let data = req.body;
    addPaperPublicationData(data,req.cookies.connectId).then((value)=>{
        if(value){
            res.redirect("/paperPublication"); 
        }
        else{
            res.sendStatus(417);
        }
    })
}
function postCitation(req,res){
    let data = req.body;
    addCitationData(data,req.cookies.connectId).then((value)=>{
        if(value){
            res.redirect("/citation"); 
        }
        else{
            res.sendStatus(417);
        }
    })
}
async function postUpdateProfile(req,res){
    try{
        const db = client.db('KITCOEK');
        const userCredentials = db.collection('userCredentials');
        let reqId = new ObjectId(req.cookies.connectId);
        let findResult =await userCredentials.findOne({password : req.body.password})
        if(findResult == null){
            throw new Error("Incorrect password!!");
        }
        if(req.body.newPassword != ""){
            req.body.password = req.body.newPassword
        }
        let updateResult =await userCredentials.updateOne(
            {_id : reqId},
            {$set :{
                name : req.body.name,
                phone : req.body.phone,
                email : req.body.email,
                employeeNo : req.body.employeeNo,
                dept : req.body.dept,
                username : req.body.username,
                password : req.body.password
            }}
            )
            if(!updateResult.acknowledged){
                throw new Error("Failed to update!!");
            }
            if(updateResult.matchedCount == 0){
                throw new Error("Incorrect Password!!");
            }
            res.redirect("userHome");
    }catch(error){
        console.log(error);
        res.send("Failed to update!! Incorrect Password");
    }
}
function postUpdateWorkshopPage(req,res){
    res.render(viewsPath+"/updateWorkshop.pug",{workshopData : JSON.parse(req.body.workshopData),workshopIndex  : req.body.workshopIndex})
}
function postUpdateConferencePage(req,res){
    res.render(viewsPath+"/updateConference.pug",{conferenceData : JSON.parse(req.body.conferenceData),conferenceIndex : req.body.confIndex})
}
function postupdatePaperPublicationPage(req,res){
    res.render(viewsPath+"/updatePaperPublication.pug",{paperPublicationData : JSON.parse(req.body.paperPublicationData),paperPublicationIndex : req.body.paperPublicationIndex})
}
function postUpdateCitationPage(req,res){
    res.render(viewsPath+"/updateCitation.pug",{citationData : JSON.parse(req.body.citationData),citationIndex : req.body.citationIndex})
}

async function postupdateWorkshop(req,res){
    updatedData = req.body;
    
    try{
        const db = client.db('KITCOEK');
        const userCredentials = db.collection('userCredentials');
        let reqId = new ObjectId(req.cookies.connectId);
        let findResult =await userCredentials.findOne({_id : reqId})
        if(findResult == null){
            throw new Error("User not found!!");
        }
        workshop = findResult.workshop[req.body.workshopIndex];

        workshop.facultyName = updatedData.fName
        workshop.facultyDesignation = updatedData.desig
        workshop.facultyDept = updatedData.dept
        workshop.workshopName = updatedData.workshopName
        workshop.orgInstitute = updatedData.institute
        workshop.venue = updatedData.venue
        workshop.nature = updatedData.nature
        workshop.duration = updatedData.duration
        workshop.startDate = updatedData.startDate
        workshop.endDate = updatedData.endDate
        workshop.financialSupport = updatedData.support
        workshop.financeSupportOrganisation = updatedData.supportOrg
        workshop.amount = updatedData.amount
        
        findResult.workshop[req.body.workshopIndex] = workshop;
        let updateResult =await userCredentials.updateOne(
            {_id : reqId},
            {$set :{workshop : findResult.workshop}}
            )
            if(!updateResult.acknowledged){
                throw new Error("Failed to update!!");
            }
            if(updateResult.matchedCount == 0){
                throw new Error("User not found!!");
            }
            res.redirect("userHome");
    }catch(error){
        console.log(error);
        res.send("Failed to update Details");
    }
}
async function postUpdateConference(req,res){
    updatedData = req.body;
    
    try{
        const db = client.db('KITCOEK');
        const userCredentials = db.collection('userCredentials');
        let reqId = new ObjectId(req.cookies.connectId);
        let findResult =await userCredentials.findOne({_id : reqId})
        if(findResult == null){
            throw new Error("User not found!!");
        }
        conference = findResult.conference[req.body.conferenceIndex];

        conference.facultyName = updatedData.fName,
        conference.facultyDesignation = updatedData.desig,
        conference.facultyDept = updatedData.dept,
        conference.authorCoAuthor = updatedData.authorOrCo,
        conference.firstAuthor = updatedData.firstAuthor,
        conference.coAuthor1 = updatedData.coAuthor1,
        conference.coAuthor2 = updatedData.coAuthor2,
        conference.coAuthor3 = updatedData.coAuthor3,
        conference.title = updatedData.title,
        conference.conferenceName = updatedData.confName,
        conference.nationalOrInternational = updatedData.nationalOrInter,
        conference.organizingInstitute = updatedData.institute,
        conference.issnNo = updatedData.issnNo,
        conference.volumes = updatedData.volumes,
        conference.pageNo = updatedData.pageNo,
        conference.date = updatedData.date,
        conference.indexing = updatedData.indexing,
        conference.citationsNo = updatedData.citationsNo,
        conference.issue = updatedData.issue,
        conference.link = updatedData.link,
        conference.presentedPublished = updatedData.presentedPub,
        conference.financialSupport = updatedData.support,
        conference.financeSupportOrganisation = updatedData.supportOrg,
        conference.amount = updatedData.amount,  
        
        findResult.conference[req.body.conferenceIndex] = conference;
        let updateResult =await userCredentials.updateOne(
            {_id : reqId},
            {$set :{conference : findResult.conference}}
            )
            if(!updateResult.acknowledged){
                throw new Error("Failed to update!!");
            }
            if(updateResult.matchedCount == 0){
                throw new Error("User not found!!");
            }
            res.redirect("userHome");
    }catch(error){
        console.log(error);
        res.send("Failed to update Details");
    }
}
async function postUpdatePaperPublication(req,res){
    updatedData = req.body;
    try{
        const db = client.db('KITCOEK');
        const userCredentials = db.collection('userCredentials');
        let reqId = new ObjectId(req.cookies.connectId);
        let findResult =await userCredentials.findOne({_id : reqId})
        if(findResult == null){
            throw new Error("User not found!!");
        }
        paperPublication = findResult.paperPublication[req.body.paperPublicationIndex];

        paperPublication.facultyName = updatedData.fName,
        paperPublication.facultyDesignation = updatedData.desig,
        paperPublication.facultyDept = updatedData.dept,
        paperPublication.authorCoAuthor = updatedData.authorOrCo,
        paperPublication.firstAuthor = updatedData.firstAuthor,
        paperPublication.coAuthor1 = updatedData.coAuthor1,
        paperPublication.coAuthor2 = updatedData.coAuthor2,
        paperPublication.coAuthor3 = updatedData.coAuthor3,
        paperPublication.title = updatedData.title,         
        paperPublication.journal = updatedData.journalName,   
        paperPublication.nationalOrInternational = updatedData.nationalOrInter,
        paperPublication.issnNo = updatedData.issnNo,
        paperPublication.volumes = updatedData.volumes,
        paperPublication.issue = updatedData.issue,
        paperPublication.pageNo = updatedData.pageNo,
        paperPublication.publicationMonth = updatedData.publicationMonth,
        paperPublication.publicationYear = updatedData.publicationYear,
        paperPublication.indexing = updatedData.indexing,
        paperPublication.impactFactor = updatedData.impactFactor,
        paperPublication.citationsNo = updatedData.citationsNo,
        paperPublication.hIndex = updatedData.hIndex,
        paperPublication.i10Index = updatedData.i10Index,
        paperPublication.financialSupport = updatedData.support,
        paperPublication.financeSupportOrganisation = updatedData.supportOrg,
        paperPublication.amount = updatedData.amount,                        
        paperPublication.link = updatedData.link,

        findResult.paperPublication[req.body.paperPublicationIndex] = paperPublication;
        let updateResult =await userCredentials.updateOne(
            {_id : reqId},
            {$set :{paperPublication : findResult.paperPublication}}
            )
            if(!updateResult.acknowledged){
                throw new Error("Failed to update!!");
            }
            if(updateResult.matchedCount == 0){
                throw new Error("User not found!!");
            }
            res.redirect("userHome");
    }catch(error){
        console.log(error);
        res.send("Failed to update Details");
    }
}
async function postUpdateCitation(req,res){
    updatedData = req.body;
    try{
        const db = client.db('KITCOEK');
        const userCredentials = db.collection('userCredentials');
        let reqId = new ObjectId(req.cookies.connectId);
        let findResult =await userCredentials.findOne({_id : reqId})
        if(findResult == null){
            throw new Error("User not found!!");
        }
        citation = findResult.citation[req.body.citationIndex];

        citation.facultyName = updatedData.fName,
        citation.facultyDesignation = updatedData.desig,
        citation.facultyDept = updatedData.dept,
        citation.authorCoAuthor = updatedData.authorOrCo,
        citation.firstAuthor = updatedData.firstAuthor,
        citation.coAuthor1 = updatedData.coAuthor1,
        citation.coAuthor2 = updatedData.coAuthor2,
        citation.coAuthor3 = updatedData.coAuthor3,
        citation.title = updatedData.title,
        citation.indexing = updatedData.indexing,
        citation.year = updatedData.year,
        citation.citedBy = updatedData.citedBy,
        citation.hIndex = updatedData.hIndex,
        citation.i10Index = updatedData.i10Index,

        findResult.citation[req.body.citationIndex] = citation;
        let updateResult =await userCredentials.updateOne(
            {_id : reqId},
            {$set :{citation : findResult.citation}}
            )
            if(!updateResult.acknowledged){
                throw new Error("Failed to update!!");
            }
            if(updateResult.matchedCount == 0){
                throw new Error("User not found!!");
            }
            res.redirect("userHome");
    }catch(error){
        console.log(error);
        res.send("Failed to update Details");
    }
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
    getUpdateProfile : getUpdateProfile,
    getDownloadUpdate : getDownloadUpdate,
    getdownloadPersonalRecords : getdownloadPersonalRecords,
    getPaperPublication : getPaperPublication,
    getCitation : getCitation,

    postUserLogin : postUserLogin,
    postWorkshop : postWorkshop,
    postConference : postConference,
    postPaperPublication : postPaperPublication,
    postCitation : postCitation,
    postUpdateProfile : postUpdateProfile,
    postUpdateWorkshopPage : postUpdateWorkshopPage,
    postUpdateConferencePage : postUpdateConferencePage,
    postupdatePaperPublicationPage : postupdatePaperPublicationPage,
    postUpdateCitationPage : postUpdateCitationPage,
    postupdateWorkshop : postupdateWorkshop,
    postUpdateConference : postUpdateConference,
    postUpdatePaperPublication : postUpdatePaperPublication,
    postUpdateCitation : postUpdateCitation,

}