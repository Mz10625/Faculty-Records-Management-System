
function jsonD(x){
  const jsonDataField = document.getElementById("jsonDataField");
  jsonDataField.value = x;
  anchor1 = document.getElementById("getAnchor1");
  anchor2 = document.getElementById("getAnchor2");
  // form = document.getElementById("form");
  // form.submit()
  // clickAnchor(anchor1,anchor2);
  setTimeout(()=>{ anchor1.click() }, 2000);
  setTimeout(()=>{ anchor2.click() }, 3000);
}
// async function clickAnchor(anchor1,anchor2){
//   setTimeout(()=>{ anchor1.click() }, 3000);
//   setTimeout(()=>{ anchor2.click() }, 5000);
// }

function downloadAllRecords(){
  anchor3 = document.getElementById("getAnchor3");
  anchor4 = document.getElementById("getAnchor4");
  anchor3.click()
  setTimeout(()=>{ anchor4.click() },5000);
}