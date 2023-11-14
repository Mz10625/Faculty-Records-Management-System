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
    .then((body)=>{
      // const headers = {
        
      //   'Content-Type' : 'application/json',
      // }
      console.log(body.token);
      fetch("/adminHome",{
        method: 'Get',
        headers: {
          'Content-Type': 'application/json', 
          'Authorization' : `Bearer ${body.token}`,
        }
      })
    })
    .catch(err => console.log(err));
}

// body => window.location.href = body.nextUrl