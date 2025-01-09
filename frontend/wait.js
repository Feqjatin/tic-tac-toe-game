var ull=document.getElementById("playerList");

document.addEventListener("DOMContentLoaded", () => {
  
    if(localStorage.getItem('uCode')==null){generateCode();
        fetch("http://localhost:3005/asignHost?uid=" + localStorage.getItem('uid') + "&sid="+localStorage.getItem('uCode'))
        .catch(e=>console.log(e));
        localStorage.setItem('user','host');
        startFetching();
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

function startFetching() {
    const intervalId = setInterval(() => {
        console.log("getting player");
        fetch("http://localhost:3005/getPlayer?sid="+localStorage.getItem('uCode'))
            .then(data => data.json())
            .then(data => {
                console.log("Response data:", data);
               // <li>Player1 <button class="admit-btn" onclick="admitPlayer('Player1')">Admit</button><button class="cancel-btn" onclick="cancelPlayer('Player1')">Cancel</button></li>
            //    for(i=0;i<data.length;i++)
            //    {
            //      if(data[i].status=='1')
                 
            //    }
                
            })
            .catch(error => console.log("Error:", error));
    }, 5000); 
}