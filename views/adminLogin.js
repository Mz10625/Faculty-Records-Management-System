function sendPostReq(){
    let uname = document.getElementById("uname").value;
    let pass = document.getElementById("pass").value;    
    
    fetch("/adminLogin",{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ UserName : uname, Password : pass}),
    })
    // .then(res => res.json())
    // .then((body)=>{
      // body.token
    // })

    // .then((body)=>{      
    //   fetch("/adminHome",{
    //     method: 'GET',
    //     headers: {
    //       'Content-Type': 'application/json', 
    //       'Authorization' : `Bearer ${body.token}`,
    //     }
    //   })
    //   .then(response => response.text())
    //   .then(text => {
    //     document.open();
    //     document.write(text);
    //     document.close();
    //   })
    //   .catch(error => console.error('Error fetching the HTML:', error));
    // })
    // .catch(err => console.log(err));
}
