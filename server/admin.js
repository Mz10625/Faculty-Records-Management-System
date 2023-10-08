const {MongoClient} = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

const uri = "mongodb+srv://suyashnalawade001:mongo0104atlas@cluster0.t7roaby.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(uri)

async function authenticate(u,p){
    try{
        await client.connect();
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
    }
    finally{
        await client.close();
    }
        
}
async function checkCookie(reqCookie){
    try{
        await client.connect();
        const db = client.db('KITCOEK');
        const adminCollection = db.collection('admin');
        let reqCookie_id = new ObjectId(reqCookie);
        const findResult = await adminCollection.findOne({_id : reqCookie_id});
        if(findResult != null){
            return true;
        }
        return false;
    }
    finally{
        await client.close();
    }
}
async function addUser(data){
    try{
        await client.connect();
        const db = client.db('KITCOEK');
        const userCredentials = db.collection('userCredentials');
        let userdata = {"name":data.name,
                        "email":data.email,
                        "dept":data.dept,
                        "phone":data.phone,
                        "username":data.username,
                        "password":data.password,
        }
        const insert = await userCredentials.insertOne(userdata,(error,result)=>{
                return result.result.ok;
        });
        return insert;
    }
    finally{
        client.close();
    }
}



module.exports = {
    adminAuthenticate : authenticate,
    checkCookie : checkCookie,
    addUser : addUser,
}