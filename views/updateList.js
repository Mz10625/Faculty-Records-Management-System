
// function sendPostReq(x){
//     data = JSON.parse(x);
//     fetch("/updateList",{
//         method: 'POST', 
//         headers: {
//           'Content-Type': 'application/json', 
//         },
//         body: JSON.stringify({ contact: data.phone }),
//     })    
    // fetch("/update",{
    //     method: 'GET', // Use the POST method
    // }).then((response) =>{
    //       // console.log(response);
    //       console.log(response.body);
    //       window.locate.replace(response.body);
    //     })    
// }
document.getElementById("homeBtn").addEventListener("click",()=>{
  document.cookie = "token="+sessionStorage.getItem("token");
  document.getElementById("homeAnchor").click();
})
// document.getElementsByClassName("submit").addEventListener("click",()=>{
//   console.log("Click")
//   document.getElementById("updateListToken").value = sessionStorage.getItem("token");
//   document.getElementById("form").submit();
// })