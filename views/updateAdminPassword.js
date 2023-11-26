document.getElementById("submitBtn").addEventListener("click",(event)=>{
    newPassValue = document.getElementById("newPass").value;
    confirmNewPassValue = document.getElementById("confirmNewPass").value;
    document.getElementById("updatePasswordToken").value = sessionStorage.getItem("token")
    if(newPassValue != confirmNewPassValue){
        alert("Confirm new password must be same as new password")
        event.preventDefault();
    }    
})