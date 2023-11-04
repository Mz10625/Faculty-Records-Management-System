
function jsonD(x){
  const jsonDataField = document.getElementById("jsonDataField");
  jsonDataField.value = x;
  anchor1 = document.getElementById("getAnchor1");
  anchor2 = document.getElementById("getAnchor2");
  
  setTimeout(()=>{ anchor1.click() }, 2000);
  setTimeout(()=>{ anchor2.click() }, 3000);
}


function downloadAllRecords(){
  anchor3 = document.getElementById("getAnchor3");
  anchor4 = document.getElementById("getAnchor4");
  anchor3.click()
  setTimeout(()=>{ anchor4.click() },5000);
}