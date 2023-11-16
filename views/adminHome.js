// const { addUser } = require("../controllers/admin");

window.addEventListener("load", (event) => {
    // TokenkeyValue = document.cookie.split(';')[1];
    token = document.cookie.split('=')[1];
    console.log(token);
    sessionStorage.setItem("token",token);
});

const addUserbtn = document.getElementById('addUser');
addUserbtn.addEventListener("click",()=>{
    
    token =  sessionStorage.getItem("token");
    fetch("/addUser",{
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },        
    })
    .then(response => response.text())
    .then(text => {
       document.open();
       document.write(text);
       document.close();
    })
    .catch(error => console.error('Error fetching the HTML:', error));
})