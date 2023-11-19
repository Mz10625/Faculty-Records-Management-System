document.getElementById("homeBtn").addEventListener("click",()=>{
    document.cookie = "token="+sessionStorage.getItem("token");
    document.getElementById("homeAnchor").click();
})