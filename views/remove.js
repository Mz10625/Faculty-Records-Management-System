
function jData(id){
    const jsonDataField = document.getElementById("jsonDataField");
    const form = document.getElementById("form");
    jsonDataField.value = id;
    form.submit();
}
