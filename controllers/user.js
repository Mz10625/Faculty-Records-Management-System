

async function userAuthenticate(client,u,p){
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
async function checkCookie(client,ObjectId,reqCookie){
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
    const updateResult = await userCollection.updateOne(
        {_id : reqCookie_id},
        {$set :{workshop : workshopData}}
    );
    if(updateResult != null){
        return true;
    }
    return false;
}
async function addConferenceData(client,data,ObjectId,reqCookie){
    const db = client.db('KITCOEK');
    const userCollection = db.collection('userCredentials');
    console.log(data);
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
    const updateResult = await userCollection.updateOne(
        {_id : reqCookie_id},
        {$set :{conference : conferenceData}}
    );
    if(updateResult != null){
        return true;
    }
    return false;
}

function getUserHome(req,res){
    res.sendFile(viewsPath+"/userHome.html");  
}
function getWorkshop(req,res){
    res.sendFile(viewsPath+"/workshop.html"); 
}
function getConference(req,res){
    res.sendFile(viewsPath+"/conference.html"); 
}
function postUserLogin(req,res){
    let data = req.body
    //res.status(200).render("index.pug");
    userAuthenticate(client,data.UserName,data.Password).then((value)=>{
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
}
function postWorkshop(req,res){
    let data = req.body;
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
    console.log(data);
    addConferenceData(client,data,ObjectId,req.cookies.connectId).then((value)=>{
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
    // checkUserCookie : checkCookie,
    // addWorkshopData : addWorkshopData,
    // addConferenceData : addConferenceData,
    getUserHome : getUserHome,
    getWorkshop : getWorkshop,
    getConference : getConference,
    postUserLogin : postUserLogin,
    postWorkshop : postWorkshop,
    postConference : postConference,
}