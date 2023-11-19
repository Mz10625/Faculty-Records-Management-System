window.addEventListener("load", (event) => {
    token = document.cookie.split('=')[1];
    if(token){
        sessionStorage.setItem("token",token);
        document.cookie =  "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
});
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

document.getElementById('workshopBtn').addEventListener("click",()=>{    
    authenticate().then((authenticateUser)=>{
        if(authenticateUser==true){
            document.getElementById('workshopAnchor').click();
        }
        else{
            document.open();
            document.write("Not Authorized");
            document.close();
        }
    })
    .catch(error => console.error('Error:', error));
})
document.getElementById('conferenceBtn').addEventListener("click",()=>{    
    authenticate().then((authenticateUser)=>{
        if(authenticateUser==true){
            document.getElementById('conferenceAnchor').click();
        }
        else{
            document.open();
            document.write("Not Authorized");
            document.close();
        }
    })
    .catch(error => console.error('Error:', error));
})
