const user = require("./user");
const Excel = require('exceljs');

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
    let workshopdata = data.workshop;
    // console.log(workshopdata);
    
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet('My Sheet');

    const headers = [
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
    ws.columns = headers; 
    ws.addRow([workshopdata.facultyName,workshopdata.facultyDesignation,workshopdata.facultyDept,
        workshopdata.workshopName,workshopdata.orgInstitute,workshopdata.venue,workshopdata.nature,
        workshopdata.duration,workshopdata.startDate,workshopdata.endDate,workshopdata.financialSupport,
        workshopdata.financeSupportOrganisation,workshopdata.amount
    ]);
    // let rows = ws.getRows(1, 2).values();

    // for (let row of rows) {

    //     row.eachCell((cell, cn) => {
    //         console.log(cell.value);
    //     });
    // }
    wb.xlsx
            .writeFile('firstExcel.xlsx')
            .then(() => {
                return true;
            })
            .catch(err => {
                console.log(err.message);
            });
    return false
}

module.exports = {
    adminAuthenticate : authenticate,
    checkCookie : checkCookie,
    addUser : addUser,
    download : download,
    getDataToUpdate :getDataToUpdate ,
    updateUserData : updateUserData,
    createExcelFile : createExcelFile,
    // connect : connect_DB,
    // close : close_DB,
}