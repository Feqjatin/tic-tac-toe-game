const sid = localStorage.getItem("uCode");
document.getElementById('playerName').innerText=localStorage.getItem('name');
document.getElementById('PlayerSymbole').innerText=" Yr : " +localStorage.getItem('sym');
statusBar=document.getElementById('status');
oppName=document.getElementById('opponentName');
document.addEventListener("keypress", (e) => {
    if(e.key=="e") {
        console.log(localStorage.getItem('uid')+" uid");
        console.log(localStorage.getItem('uCode')+" ucode");
    }
});

async function fetchGameState() {
    try {
        const response = await fetch(`https://business-game-i1dp.onrender.com/gameState?uid=${localStorage.getItem('uid')}&sid=${localStorage.getItem('uCode')}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${await response.text()}`);
        }

        const data = await response.json();

        if (data.game.status === "completed") {
            if (data.game.winner && data.game.winner !== "tie") {
                showPopup(`🎉 Player ${data.game.winner} wins! 🎉`);
            } else {
                showPopup(`🤝 It's a Tie!`);
            }
            setTimeout(() => {
                closePopup();
                restartGame();
            }, 4000);  
            return;  
        }

        statusBar.innerText = `Current Turn: ${data.game.currentTurn}`;
        oppName.innerText = data.opponentName;

        if (data.game.board) {
            document.querySelectorAll('.cell').forEach((cell, index) => {
                cell.innerText = data.game.board[index] || '';
            });
        }

    } catch (error) {
        console.error("Failed to fetch game state:", error);
    }
}

async function makeMove(position) {
    try {
        const response = await fetch('https://business-game-i1dp.onrender.com/makeMove', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sid: sid || 0,
                position: position || 0,
                symbol: localStorage.getItem('sym') || 0
            })
        });
        const data = await response.json();

        document.getElementById('status').innerText = data.message;

        if (data.board) {
            document.querySelectorAll('.cell').forEach((cell, index) => {
                cell.innerText = data.board[index] || '';
            });
        }

        

    } catch (error) {
        console.error("Error making move:", error);
    }
}

function showPopup(message) {
    const popup = document.getElementById('winnerPopup');
    const messageElement = document.getElementById('popupMessage');
    messageElement.innerText = message;
    popup.style.display = 'block';
      

    setTimeout(closePopup, 3000);
}

function closePopup() {
    const popup = document.getElementById('winnerPopup');
    popup.style.display = 'none';
}

async function restartGame() {
    try {
        const response = await fetch('https://business-game-i1dp.onrender.com/restartGame', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ sid })
        });

        const data = await response.json();

        if (response.ok) {
            document.querySelectorAll('.cell').forEach(cell => {
                cell.innerText = '';
            });
            document.getElementById('status').innerText = "Player X's Turn";
        } else {
            console.error("Error:", data.message);
        }
    } catch (error) {
        console.error("Error restarting game:", error);
    }
}


const end=setInterval(fetchGameState, 1000);
 
