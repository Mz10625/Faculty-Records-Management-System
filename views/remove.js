
async function authenticate(){
    token =  sessionStorage.getItem("token");
    let res = await fetch("/authenticate",{
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },        
                    })
    return res.json();
}

function jData(id){
    if(confirm("Are you sure you want to remove this Record?")==true){
        authenticate().then((authenticateUser)=>{
                if(authenticateUser==true){
                    const jsonDataField = document.getElementById("jsonDataField");
                    const form = document.getElementById("form");
                jsonDataField.value = id;
                form.submit();
            }
            else{
                document.open();
                document.write("Not Authorized");
                document.close();
            }
        })
    }
}
document.getElementById("homeBtn").addEventListener("click",()=>{
    document.cookie = "token="+sessionStorage.getItem("token");
    document.getElementById("homeAnchor").click();
})
