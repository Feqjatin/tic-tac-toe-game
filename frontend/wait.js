document.addEventListener("DOMContentLoaded", () => {
  
    if(localStorage.getItem('uCode')==null){generateCode();}
    else{
        document.getElementById("codeDisplay").innerText=localStorage.getItem('uCode');
    }
});


function generateCode(){
    console.log("okk");
    const display=(code)=>{
    console.log("hii"+code);
    localStorage.setItem('uCode', code);
    
   document.getElementById("codeDisplay").innerText=code;
    }
        fetch("http://localhost:3005/serverGet")
       .then(data=>data.json())
       .then(data=>display(data.val))
       .catch(e=>console.log(e));
     
   }
   function copyCode() {
    const code = document.getElementById('codeDisplay').textContent;
    navigator.clipboard.writeText(code);
    alert('Code copied to clipboard!');
}

function admitPlayer(playerName) {
    alert(playerName + ' has been admitted!');
}

function cancelPlayer(playerName) {
    alert(playerName + ' has been removed!');
}

function startGame() {
    alert('Starting the game...');
    window.location.href = 'game.html';
}