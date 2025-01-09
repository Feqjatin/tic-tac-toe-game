var ulAccepted=document.getElementById("playerList_1");
var ull=document.getElementById("playerList");

document.addEventListener("DOMContentLoaded", () => {
  
    if(localStorage.getItem('uCode')==null){generateCode();
        
    }
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
        fetch("http://localhost:3005/serverGet?uid="+localStorage.getItem('uid'))
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

function startFetching() {
    const intervalId = setInterval(() => {
        console.log("getting player");
        fetch("http://localhost:3005/checkPlayer?sid="+localStorage.getItem('uCode'))
            .then(data => data.json())
            .then(data => {
                console.log("Response data:", data[0].name);
               // <li>Player1 <button class="admit-btn" onclick="admitPlayer('Player1')">Admit</button><button class="cancel-btn" onclick="cancelPlayer('Player1')">Cancel</button></li>
               for(i=0;i<data.length;i++)
               {
                if(data[i].status=='0')
                {
                    ulAccepted.innerHTML+=`<li>${data[i].name} </li>`;
                }
                else{
                    ull.innerHTML+=`<li>${data[i].name}  <button class="admit-btn" onclick="admitPlayer(${data[i].uid})">Admit</button><button class="cancel-btn" onclick="cancelPlayer(${data[i].uid})">Cancel</button></li>`;
                }
                 console.log(data[i].name);
                 
               }
               clearInterval(intervalId); 
            })
            .catch(error => console.log("Error:", error));
    }, 5000); 
}
startFetching();