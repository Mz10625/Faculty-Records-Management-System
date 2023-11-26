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

document.getElementById('workshopBtn').addEventListener("click",()=>{    
    document.getElementById("workshopToken").value = sessionStorage.getItem("token");
    document.getElementById("workshopForm").submit();
})
document.getElementById('conferenceBtn').addEventListener("click",()=>{    
    document.getElementById("conferenceToken").value = sessionStorage.getItem("token");
    document.getElementById("conferenceForm").submit();
})
document.getElementById('paperPublicationBtn').addEventListener("click",()=>{    
    document.getElementById("paperPublicationToken").value = sessionStorage.getItem("token");
    document.getElementById("paperPublicationForm").submit();
})
document.getElementById('citationBtn').addEventListener("click",()=>{    
    document.getElementById("citationToken").value = sessionStorage.getItem("token");
    document.getElementById("citationForm").submit();
})
document.getElementById('updateProfileBtn').addEventListener("click",()=>{    
    document.getElementById("updateProfileToken").value = sessionStorage.getItem("token");
    document.getElementById("updateProfileForm").submit();
})
document.getElementById('downloadUpdateBtn').addEventListener("click",()=>{    
    document.getElementById("downloadUpdateToken").value = sessionStorage.getItem("token");
    document.getElementById("downloadUpdateForm").submit();
})
