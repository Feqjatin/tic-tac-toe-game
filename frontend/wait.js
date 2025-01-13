var ulAccepted=document.getElementById("playerList_1");


document.addEventListener("DOMContentLoaded", () => {
    
    if(localStorage.getItem('uCode')==null){
        setTimeout(generateCode(),200);
    }
    else{
        document.getElementById("codeDisplay").innerText=localStorage.getItem('uCode');
    }
    if(localStorage.getItem('user')!='host'){
        setTimeout(()=>{
            console.log("ooo"+localStorage.getItem('user'));
            
            document.getElementById('strtBtn').style.display='none';
        },2);
        lookForStart();
        localStorage.setItem('sym','O');
        
        
    }
    else{
        localStorage.setItem('sym','X');
    }
});



function generateCode(){
    //console.log("okk");
    const display=(code)=>{
    console.log("hii"+code);
    localStorage.setItem('uCode', code);
     
   document.getElementById("codeDisplay").innerText=code;
    }   

         //console.log(localStorage.getItem('name')+"'''''''''");
        fetch("https://business-game-i1dp.onrender.com/serverGet?uid="+localStorage.getItem('uid')+"&name="+localStorage.getItem('name'))
       .then(data=>data.json())
       .then(data=>display(data.val))
       .catch(e=>console.log(e));
     
   }
   function copyCode() {
    const code = document.getElementById('codeDisplay').textContent;
    navigator.clipboard.writeText(code);
    //alert('Code copied to clipboard!');
}




function startGame() {
    console.log("lara");
    fetch(`https://business-game-i1dp.onrender.com/startGame?sid=${localStorage.getItem('uCode')}`)
    .then(response => response.json())
    .then(data => {

        console.log(data.message);
        window.location.href = 'game.html';
    })
    .catch(e => console.error("Error starting game:", e));
   
}

function startFetching() {
    const intervalId = setInterval(() => {
        console.log("getting player");
        fetch("https://business-game-i1dp.onrender.com/checkPlayer?sid="+localStorage.getItem('uCode')+"&ran="+Math.random()*1000)
            .then(data => data.json())
            .then(data => {
                console.log("Response data:");
                ulAccepted.innerHTML="";
               // <li>Player1 <button class="admit-btn" onclick="admitPlayer('Player1')">Admit</button><button class="cancel-btn" onclick="cancelPlayer('Player1')">Cancel</button></li>
               for(i=0;i<data.length;i++)
               {
                   ulAccepted.innerHTML+=`<li>${data[i].name} </li>`;
               }
                 
            })
            .catch(error => console.log("Error:", error));
    }, 4000); 
}

function  lookForStart(){
    const intervalId = setInterval(() => {
        fetch(`https://business-game-i1dp.onrender.com/checkGame?sid=${localStorage.getItem('uCode')}`)
        .then(response => response.json())
        .then(data => {
            if(data.status=="in_progress"){
                window.location.href = 'game.html';
            }
            else if(data.status=="completed")
            {
                alert("game end ");
                localStorage.clear();
                window.location.href = 'index1.html';
            }
            console.log("Game State:", data.status);
        })
        .catch(e => console.error("Error checking game state:", e));
    },2000);
}





startFetching();
 
document.addEventListener("keypress", (e) => {
    if(e.key=="e")
    { console.log(localStorage.getItem('uid')+" uid");
    console.log(localStorage.getItem('name')+" name");
    }
    
});