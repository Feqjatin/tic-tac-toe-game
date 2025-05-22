require('dotenv').config();
var backendUrl=process.env.BACKEND_URL;
console.log("Backend URL:", backendUrl);
function getUid(userName) {
    if (userName.length > 0) {
        console.log("getting uid");
        const display = (code) => {
            console.log("uid" + code);
            localStorage.setItem('uid', code);
            localStorage.setItem('name',userName);
        }

        fetch("https://tic-tac-toe-game-e4oh.onrender.com/userGet?name=" + userName)
            .then(data => data.json())
            .then(data => {
                display(data.val); 
                 
                window.location.href = 'dire.html';
            })
            .catch(e => console.log(e));
    }
}

document.addEventListener("DOMContentLoaded", () => {
     
    console.log(localStorage.getItem('uid')+" uid");
    console.log(localStorage.getItem('uCode')+" ucode");
     localStorage.clear();
    
    
});