document.getElementById("submitBtn").addEventListener("click",(event)=>{
    newPassValue = document.getElementById("newPass").value;
    confirmNewPassValue = document.getElementById("confirmNewPass").value;
    if(newPassValue != confirmNewPassValue){
        alert("Confirm new password must be same as new password")
        event.preventDefault();
    }
  
})