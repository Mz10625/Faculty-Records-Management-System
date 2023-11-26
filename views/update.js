window.addEventListener("load", (event) => {
  document.getElementById("updateUserToken").value = sessionStorage.getItem("token");
});