function sendPostReq(){
    let uname = document.getElementById("uname").value;
    let pass = document.getElementById("pass").value;
    
    
    fetch("/adminLogin",{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Specify the content type as JSON
        },
        body: JSON.stringify({ UserName : uname, Password : pass}),
    }).then(res => res.json())
    .then(body => window.location.href = body.nextUrl)
    .catch(err => console.log(err));
}