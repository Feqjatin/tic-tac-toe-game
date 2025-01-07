var Code;
function connectGame() {
    const code = document.getElementById('uniqueCode').value;
    if(code) {
        //alert('Connecting to server with code: ' + code);
        localStorage.setItem('uCode',code);
        document.getElementById('loading').style.display = 'flex';
        waiting();
    } else {
        alert('Please enter a valid code.');
    }
}

function createNewGame() {
    window.location.href = 'wait.html';
    //alert('Creating a new game...');
     
}
function waiting()
{
    //comming soon
}
 
  

