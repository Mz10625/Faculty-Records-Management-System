
window.addEventListener("load", (event) => {
    token = document.cookie.split('=')[1];
    if(token){
        sessionStorage.setItem("token",token);
        document.cookie =  "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
});

// async function authenticate(){
//     token =  sessionStorage.getItem("token");
//     let res = await fetch("/authenticate",{
//                         method: 'GET',
//                         headers: {
//                             'Authorization': `Bearer ${token}`,
//                         },        
//                     })
//     return res.json();
// }


document.getElementById('addUserBtn').addEventListener("click",()=>{    
    document.getElementById("addUserToken").value = sessionStorage.getItem("token");
    document.getElementById("addUserForm").submit();
    // authenticate().then((authenticateUser)=>{
    //     if(authenticateUser==true){
    //         document.getElementById('addUserAnchor').click();
    //     }
    //     else{
    //         document.open();
    //         document.write("Not Authorized");
    //         document.close();
    //     }
    // })
    // .catch(error => console.error('Error:', error));
})

document.getElementById('updateUserBtn').addEventListener("click",()=>{    
    document.getElementById("updateUserToken").value = sessionStorage.getItem("token");
    document.getElementById("updateUserForm").submit();
})

document.getElementById('removeUserBtn').addEventListener("click",()=>{    
    document.getElementById("removeUserToken").value = sessionStorage.getItem("token");
    document.getElementById("removeUserForm").submit();
})
document.getElementById('downloadBtn').addEventListener("click",()=>{    
    document.getElementById("downloadToken").value = sessionStorage.getItem("token");
    document.getElementById("downloadForm").submit();
})
document.getElementById('updatePasswordBtn').addEventListener("click",()=>{    
    document.getElementById("updatePasswordToken").value = sessionStorage.getItem("token");
    document.getElementById("updatePasswordForm").submit();
})