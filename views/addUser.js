document.getElementById("homeBtn").addEventListener("click",()=>{
    document.cookie = "token="+sessionStorage.getItem("token");
    document.getElementById("homeAnchor").click();
})
window.addEventListener("load", (event) => {
    document.getElementById("addUserToken").value = sessionStorage.getItem("token");
});

