// const user = require("./user");
const Excel = require('exceljs');
const path = require("path");

async function authenticate(client,u,p){
    //try{
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
        // }
    //}
    // finally{
    //     await client.close();
    // }
}
async function checkCookie(client,ObjectId,reqCookie){
    //try{
        // await client.connect();
        const db = client.db('KITCOEK');
        const adminCollection = db.collection('admin');
        let reqCookie_id = new ObjectId(reqCookie);
        const findResult = await adminCollection.findOne({_id : reqCookie_id});
        if(findResult != null){
            return true;
            // console.log("Error thrown")
            // throw new Error("Invalid cookie");
        }
        return false;
    // }
    // finally{
    //     await client.close();
    // }
}
async function addUser(client,data){
    // try{
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
    // }
    // finally{
    //     client.close();
    // }
}

async function download(client){
    const db = client.db('KITCOEK');
    const userCredentials = db.collection('userCredentials');
    let doc = await userCredentials.find()
    let list = []
    for await(const x of doc) {        
        list.push(x);
    }
    // console.log(userdata[1])
    return {value:true,userdata:list,};
}
async function getDataToUpdate(client,contact){
    const db = client.db('KITCOEK');
    const userCredentials = db.collection('userCredentials');
    let data = await userCredentials.findOne({phone : contact});
     
    if(data != null){
        return {value:true,userdata:data,};
    }
    return {value:false,userdata:null,};
}
async function updateUserData(client,ObjectId,updatedData){
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
}

async function createExcelFile(data){
   
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

}
async function removeUser(client,ObjectId,id){
    const db = client.db('KITCOEK');
    const userCredentials = db.collection('userCredentials');
    const reqId = new ObjectId(id);
    const result = await userCredentials.deleteOne({_id:reqId});
    return result.deletedCount;
}




// const path = require("path");
const viewsPath = path.dirname(__dirname)+"/views";

function getAdminLogin(req,res){
    res.sendFile(viewsPath+"/adminLogin.html");
}


module.exports = {
    adminAuthenticate : authenticate,
    checkCookie : checkCookie,
    addUser : addUser,
    download : download,
    getDataToUpdate :getDataToUpdate ,
    updateUserData : updateUserData,
    createExcelFile : createExcelFile,
    getAdminLogin : getAdminLogin,
    removeUser : removeUser,

}