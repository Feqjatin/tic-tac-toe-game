var ulAccepted=document.getElementById("playerList_1");


document.addEventListener("DOMContentLoaded", () => {
     
    if(localStorage.getItem('uCode')==null){
        generateCode();
    }
    else{
        document.getElementById("codeDisplay").innerText=localStorage.getItem('uCode');
    }
    if(localStorage.getItem('user')!='host'){
        setTimeout(()=>{
            console.log("ooo"+localStorage.getItem('user'));
            document.getElementById('strtBtn').style.display='none';
        },2);
        
    }
    else{
       
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
 

function startGame() {
    fetch("http://localhost:3005/startGame?sid="+localStorage.getItem('sid'))
       .then(data=>data.json())
       .then(data=>{
       window.location.href = 'game.html';
        })
       .catch(e=>console.log(e));

   
}

function startFetching() {
    const intervalId = setInterval(() => {
        console.log("getting player");
        fetch("http://localhost:3005/checkPlayer?sid="+localStorage.getItem('uCode')+"&ran="+Math.random()*1000)
            .then(data => data.json())
            .then(data => {
                console.log("Response data:");
               // <li>Player1 <button class="admit-btn" onclick="admitPlayer('Player1')">Admit</button><button class="cancel-btn" onclick="cancelPlayer('Player1')">Cancel</button></li>
               for(i=0;i<data.length;i++)
               {
                   ulAccepted.innerHTML+=`<li>${data[i].name} </li>`;
               }
               clearInterval(intervalId); 
            })
            .catch(error => console.log("Error:", error));
    }, 5000); 
}
startFetching();