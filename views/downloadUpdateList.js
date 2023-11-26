 
  
function updateWorkshop(x,index){
        const workshopDataField = document.getElementById("workshopDataField");
        document.getElementById("workshopIndex").value = index;
        workshopDataField.value = x;
        document.getElementById('workshopForm').submit();
}
function updateConference(x,index){
    // authenticate().then((authenticateUser)=>{
    //   if(authenticateUser==true){
        const conferenceDataField = document.getElementById("conferenceDataField");
        document.getElementById("confIndex").value = index;
        conferenceDataField.value = x;
        document.getElementById('confForm').submit();
    //   }
    //   else{
    //     document.open();
    //     document.write("Not Authorized");
    //     document.close();
    //   } 
    // })
    // .catch(error => console.error('Error:', error));
}
function updatePaperPublication(x,index){
        const paperPublicationField = document.getElementById("paperPublicationField");
        document.getElementById("paperPublicationIndex").value = index;
        paperPublicationField.value = x;
        document.getElementById('paperPublicationForm').submit();
      
}
function updateCitation(x,index){
        const citationField = document.getElementById("citationField");
        document.getElementById("citationIndex").value = index;
        citationField.value = x;
        document.getElementById('citationForm').submit();
}
  
async function downloadAllRecords(){
          anchor1 = document.getElementById("getAnchor1");
          anchor1.click()
}