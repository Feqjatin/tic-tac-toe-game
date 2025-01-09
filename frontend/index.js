var Code;
function connectGame() {
    const code = document.getElementById('uniqueCode').value;
    if(code) {
        //alert('Connecting to server with code: ' + code);
        localStorage.setItem('uCode',code);
        localStorage.setItem('user','player');
        //document.getElementById('loading').style.display = 'flex';
        waiting();
    } else {
        alert('Please enter a valid code.');
    }
}

function createNewGame() {
    localStorage.setItem('user','host');
    window.location.href = 'wait.html';
    //alert('Creating a new game...');
     
}
function waiting()
{
    console.log("try to join ");
    fetch("http://localhost:3005/join?uid=" + localStorage.getItem('uid') + "&sid="+localStorage.getItem('uCode'))
    .then(data=>data.json())
    .then(data=>{
    console.log(data+" join");
    window.location.href = 'wait.html';
    })
    .catch(e=>console.log(e));
   
        
}
// function startFetching() {
//     const intervalId = setInterval(() => {
//         console.log("check");
//         fetch("http://localhost:3005/checkStatus?uid=" + localStorage.getItem('uid') + "&sid="+localStorage.getItem('uCode'))
//             .then(data => data.json())
//             .then(data => {
//                 console.log("Response data:", data);
//                 if (data.val == '0') {
                     
//                     
//                     console.log("Interval cleared due to response:", data.response);
//                     clearInterval(intervalId);
                    
//                 }
//                 else if(data.val == '2')
//                 {
//                     alert("decline");
//                     clearInterval(intervalId);
//                 }
//                 else{
//                      console.log("1");
//                 }
//             })
//             .catch(error => console.log("Error:", error));
//     }, 5000); 
// }

 

document.addEventListener("keypress", (e) => {
    if(e.key=="e")
    {console.log(localStorage.getItem('uid')+" uid");
    console.log(localStorage.getItem('uCode')+" ucode");
     localStorage.clear();
    }
    
});

  

