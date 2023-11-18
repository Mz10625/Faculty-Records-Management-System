async function authenticate(){
  token =  sessionStorage.getItem("token");
  let res = await fetch("/authenticate",{
                      method: 'GET',
                      headers: {
                          'Authorization': `Bearer ${token}`,
                      },        
                  })
  return res.json();
}


function jsonD(x){
  authenticate().then((authenticateUser)=>{
    if(authenticateUser==true){
      const jsonDataField = document.getElementById("jsonDataField");
      jsonDataField.value = x;
      document.getElementById('form').submit();
      
      anchor1 = document.getElementById("getAnchor1");
      anchor1.href = "/downloadWorkshopFile/"+JSON.parse(x).phone+"/"+JSON.parse(x).name;
      anchor2 = document.getElementById("getAnchor2");
      anchor2.href ="/downloadConferenceFile/"+JSON.parse(x).phone+"/"+JSON.parse(x).name;
      setTimeout(()=>{ anchor1.click() }, 2000);
      setTimeout(()=>{ anchor2.click() }, 3000);
    }
    else{
      document.open();
      document.write("Not Authorized");
      document.close();
    } 
  })
  .catch(error => console.error('Error:', error));
}

async function downloadAllRecords(){
  authenticate().then((authenticateUser)=>{
      console.log(authenticateUser);
      if(authenticateUser==true){
        anchor3 = document.getElementById("getAnchor3");
        anchor4 = document.getElementById("getAnchor4");
        anchor3.click()
        setTimeout(()=>{ anchor4.click() },5000);
      }
      else{
        document.open();
        document.write("Not Authorized");
        document.close();
      } 
  })
}