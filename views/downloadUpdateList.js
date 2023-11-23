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
  
  
function updateWorkshop(x,index){
    authenticate().then((authenticateUser)=>{
      if(authenticateUser==true){
        const workshopDataField = document.getElementById("workshopDataField");
        document.getElementById("workshopIndex").value = index;
        workshopDataField.value = x;
        document.getElementById('workshopForm').submit();
      }
      else{
        document.open();
        document.write("Not Authorized");
        document.close();
      } 
    })
    .catch(error => console.error('Error:', error));
}
function updateConference(x,index){
    authenticate().then((authenticateUser)=>{
      if(authenticateUser==true){
        const conferenceDataField = document.getElementById("conferenceDataField");
        document.getElementById("confIndex").value = index;
        conferenceDataField.value = x;
        document.getElementById('confForm').submit();
      }
      else{
        document.open();
        document.write("Not Authorized");
        document.close();
      } 
    })
    .catch(error => console.error('Error:', error));
}
function updatePaperPublication(x,index){
    authenticate().then((authenticateUser)=>{
      if(authenticateUser==true){
        const paperPublicationField = document.getElementById("paperPublicationField");
        document.getElementById("paperPublicationIndex").value = index;
        paperPublicationField.value = x;
        document.getElementById('paperPublicationForm').submit();
      }
      else{
        document.open();
        document.write("Not Authorized");
        document.close();
      } 
    })
    .catch(error => console.error('Error:', error));
}
function updateCitation(x,index){
    authenticate().then((authenticateUser)=>{
      if(authenticateUser==true){
        const citationField = document.getElementById("citationField");
        document.getElementById("citationIndex").value = index;
        citationField.value = x;
        document.getElementById('citationForm').submit();
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
        if(authenticateUser==true){
          anchor1 = document.getElementById("getAnchor1");
          anchor1.click()
        }
        else{
          document.open();
          document.write("Not Authorized");
          document.close();
        } 
    })
}