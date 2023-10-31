
function sendData(x){
    fetch("/download",{
        method: 'POST', // Use the POST method
        headers: {
          'Content-Type': 'application/json', // Specify the content type as JSON
        },
        body: x,
    })
    fetch('/downloadFile')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.blob();
  })
  .then(blob => {
    // Create an object URL for the Blob
    const fileURL = URL.createObjectURL(blob);

    // Create an anchor element to simulate a download link
    const downloadLink = document.createElement('a');
    downloadLink.href = fileURL;
    downloadLink.download = 'downloadedFile.xlsx'; // Set the suggested file name
    downloadLink.textContent = 'Click to download the file';

    // Trigger a click event on the anchor element to prompt the download
    downloadLink.click();
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });

    /*
    const Excel = require('exceljs');
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet('My Sheet');

    data = JSON.parse(x);
    workshopdata = data.workshop;

    const headers = [
        { header: 'Faculty name', key: 'fn', width: 15 },
        { header: 'Faculty Designation', key: 'desig', width: 15 },
        { header: 'Faculty Department', key: 'occ', width: 15 },
        { header: 'Workshop Name', key: 'sl', width: 15 },
    ]
    ws.columns = headers; 
    ws.addRow([workshopdata.facultyName,workshopdata.facultyDesignation,workshopdata.facultyDept,workshopdata.workshopName]);
    let rows = ws.getRows(1, 2).values();

    for (let row of rows) {

        row.eachCell((cell, cn) => {
            console.log(cell.value);
        });
    }*/
}

function jsonD(x){
  const jsonDataField = document.getElementById("jsonDataField");
  jsonDataField.value = x;
  anchor = document.getElementById("getAnchor");
  // form = document.getElementById("form");
  // form.submit()
  clickAnchor(anchor);
}
async function clickAnchor(anchor){
  console.log("start")
  await new Promise(()=>{
    setTimeout(()=>{ anchor.click() }, 1000);
  });
  // console.log("end") not executed
}