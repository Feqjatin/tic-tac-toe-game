 
const express = require('express');
const mongoose = require('mongoose');
const cors= require('cors');
const bodyParser = require('body-parser');
const url=require('url');

const app = express();
const PORT = 3005;
 
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

 
mongoose.connect('mongodb+srv://prajapatijatin:123456789Ok@cluster0.7dpjd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Error connecting to MongoDB:', err));
 
 

const userSchema = new mongoose.Schema({
    uid: { type: String, required: true },
    name: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);

const hostSchema = new mongoose.Schema({
    sid: {type: String,required: true},
    uid: {type: String,required: true}
});
const Host = mongoose.model('Host', hostSchema);

 
const playerSchema = new mongoose.Schema({
    sid: { type: String, required: true },   
    uid: { type: String, required: true },  
    name: { type: String, required: true },  
    symbol: { type: String, enum: ['X', 'O'], required: true },  
    status: { type: String, enum: ['waiting', 'ready'], required: true },  
});
const Player = mongoose.model('Player', playerSchema);

const gameSchema = new mongoose.Schema({
    sid: { type: String, required: true },   
    board: { type: [String], default: Array(9).fill(null) },  
    currentTurn: { type: String, enum: ['X', 'O'], default: 'X' },  
    status: { type: String, enum: ['waiting', 'in_progress', 'completed'], default: 'waiting' }, 
});
const Game =mongoose.model("Game", gameSchema);





app.get('/serverGet', async (req, res) => {
    const tempUid = url.parse(req.url, true).query.uid;
    const tempName = url.parse(req.url, true).query.name;
    console.log(tempUid+" pp "+tempName);
    try {
        while (true) {
            const tempCode = generateCode();
            const host = await Host.findOne({ sid: tempCode });
            
            if (!host) {   
                const newHost = new Host({ sid: tempCode, uid: tempUid });
                await newHost.save();

                 
                const newGame = new Game({ sid: tempCode });
                const newPlayer = new Player({
                    sid: tempCode,   
                    uid: tempUid,
                    name: tempName  || "Player1",  
                    symbol: "X",
                    status: "ready",
                });

                await newGame.save();
                await newPlayer.save();
                
                res.json({ val: tempCode });  
                console.log("Host added:", tempCode);
                break;  
            } else {
                console.log("Duplicate code, retrying...");
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating server');
    }
});



app.get('/userGet', async (req, res) => {
    tempName=url.parse(req.url, true).query.name;
    //console.log(tempName);
    try { 
        
        while(true)
        {
        tempCode=generateUid();
        const servers = await User.find({uid:tempCode});
        if(servers[0]==null){
            const newUser = new User({ uid: tempCode,name:tempName});
            const result = await newUser.save(); 
            code={"val":tempCode};
             
            res.json(code);break;
        }
        else{
            console.log("re");
        }
        }
    } catch (error) {
        res.status(500).send('Error fetching servers');
    }
});

 
app.get('/checkPlayer', async (req, res) => {
    try {
        Usid = url.parse(req.url, true).query.sid;
        const PlayerRes = await Player.find({ sid: Usid });
        
        if (PlayerRes.length === 0) {  
            res.json({ name: null });
        } else {
            res.json(PlayerRes);
        }
        console.log("Get player for " + Usid);
    } catch (error) {
        res.status(500).send('Error fetching players');
    }
});






function generateCode()
{
    var code="";
    for( i=0;i<10;i++)
    {
        temp=Math.floor(Math.random()*27);
        code+=String.fromCharCode(65+temp);
    }
   return code;
}
function generateUid()
{
    var code="";
    for( i=0;i<10;i++)
    {
        temp=Math.floor(Math.random()*11);
        code+=String.fromCharCode(48+temp);
    }
   return code;
}



 


app.get("/joinGame", async (req, res) => {
    const sid = url.parse(req.url, true).query.sid;
    const uid = url.parse(req.url, true).query.uid;
    const name = url.parse(req.url, true).query.name;
  
    console.log("Tsid:", sid, "TUuid:", uid, "Tname:", name);   
  
    try {
      const game = await Game.findOne({ sid });
      if (!game) return res.status(404).send("Game not found.");
  
      if (game.status !== "waiting")
        return res.status(400).send("Game already in progress.");
  
      const newPlayer = new Player({
        sid,
        uid,  
        name,
        symbol: "O",
        status: "ready",
      });
  
      await newPlayer.save();
  
      game.status = "waiting";
      await game.save();
  
      res.json({ message: "Joined successfully." });
    } catch (err) {
      console.error("Error joining game:", err);
      res.status(500).send("Error joining game.");
    }
  });
  

app.get("/startGame", async (req, res) => {
    console.log("aayaa");
    const sid  = url.parse(req.url, true).query.sid;

    try {
      const game = await Game.findOne({ sid });
      game.status = "in_progress";
      await game.save();
      res.json({"va":"ho gya"});
    } catch (err) {
        console.error(err);
        res.status(500).send("Error starting game.");
      }
});
app.get("/checkGame", async (req, res) => {
    const { sid } = url.parse(req.url, true).query;

    try {
      const game = await Game.findOne({ sid });
      res.json(game);
       
    } catch (err) {
        console.error(err);
        res.status(500).send("Error starting game.");
      }
});


 
app.get("/gameState", async (req, res) => {
    const sid = url.parse(req.url, true).query.sid;
    const uid = url.parse(req.url, true).query.uid;
  
    try {
       
      const game = await Game.findOne({ sid });
      if (!game) return res.status(404).send("Game not found.");
  
      const players = await Player.find({ sid });
        
        const opponent = players.find(player => player.uid !== uid);
        const opponentName = opponent ? opponent.name : null;
      res.json({
        game,
        players,
        opponentName, 
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("Error fetching game state.");
    }
  });
  

 
app.post('/makeMove', async (req, res) => {
  const { sid, position, symbol } = req.body;

  try {
      const game = await Game.findOne({ sid });
      if (!game) return res.status(404).json({ message: "Game not found" });

       
      if (game.status === "completed") {
          return res.status(400).json({ message: "Game is already completed!" });
      }

       
      if (game.currentTurn !== symbol) {
          return res.status(403).json({ message: `It's not ${symbol}'s turn!` });
      }

       
      if (game.board[position]) {
          return res.status(400).json({ message: "Position already taken!" });
      }

       
      game.board[position] = symbol;

       
      const winPatterns = [
          [0, 1, 2], [3, 4, 5], [6, 7, 8],
          [0, 3, 6], [1, 4, 7], [2, 5, 8],
          [0, 4, 8], [2, 4, 6]
      ];

      const winner = winPatterns.find(pattern => {
          const [a, b, c] = pattern;
          return game.board[a] && game.board[a] === game.board[b] && game.board[a] === game.board[c];
      });

      if (winner) {
          game.status = "completed";
          game.winner = game.board[winner[0]];
      } else if (!game.board.includes(null)) {
          game.status = "completed";
          game.winner = "tie";  
      } else {
          
          game.currentTurn = symbol === "X" ? "O" : "X";
      }

      // Save the game state
      await game.save();

      const responseMessage = game.winner
          ? game.winner === "tie"
              ? "Match is a tie!"
              : `Player ${game.winner} wins!`
          : "Move made";

      res.status(200).json({
          message: responseMessage,
          board: game.board,
          currentTurn: game.currentTurn,
          winner: game.winner
      });
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error making move", error: err.message });
  }
});



app.post('/restartGame', async (req, res) => {
  const { sid } = req.body;

  const game = await Game.findOne({ sid });
  if (!game) return res.status(404).json({ message: "Game not found" });

  game.board = Array(9).fill(null);
  game.currentTurn = "X";
  game.status = "waiting";
  game.winner = null;

  await game.save();
  res.status(200).json({ message: "Game restarted", board: game.board });
});


 
 
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
