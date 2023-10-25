
function sendPostReq(x){
    data = JSON.parse(x);
    fetch("/updateList",{
        method: 'POST', // Use the POST method
        headers: {
          'Content-Type': 'application/json', // Specify the content type as JSON
        },
        body: JSON.stringify({ contact: data.phone }),
    })    
    // fetch("/update",{
    //     method: 'GET', // Use the POST method
    // }).then((response) =>{
    //       // console.log(response);
    //       console.log(response.body);
    //       window.locate.replace(response.body);
    //     })    
}