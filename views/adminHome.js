window.addEventListener("load", (event) => {
    TokenkeyValue = document.cookie.split(';')[1];
    token = TokenkeyValue.split('=')[1];
    console.log(token);
    sessionStorage.setItem("token",token);
});