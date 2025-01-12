var Code;
document.addEventListener("DOMContentLoaded", () => {
  uid=localStorage.getItem('uid');
  Uname=localStorage.getItem('name');
  localStorage.clear();
  localStorage.setItem('uid',uid);
  localStorage.setItem('name',Uname);
});
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
    fetch(`http://localhost:3005/joinGame?uid=${localStorage.getItem('uid')}&sid=${localStorage.getItem('uCode')}&name=${localStorage.getItem('name')}`)
  .then(response => {
    console.log("Response status:", response.status);
    return response.text();  // Get raw text to inspect
  })
  .then(data => {
    console.log("Response body:", data);
    try {
      const jsonData = JSON.parse(data);  // Attempt to parse JSON
      console.log("Parsed JSON:", jsonData);
      window.location.href = 'wait.html';
    } catch (e) {
      console.error("Error parsing JSON:", e);
    }
  })
  .catch(e => console.error("Error:", e));

   
        
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

  

