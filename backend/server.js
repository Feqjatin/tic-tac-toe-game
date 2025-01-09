// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const cors= require('cors');
const bodyParser = require('body-parser');
const url=require('url');

const app = express();
const PORT = 3005;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://prajapatijatin:123456789Ok@cluster0.7dpjd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Define Schema and Model
// const serverSchema = new mongoose.Schema({
//     sid: { type: String, required: true }
// });
// const Server = mongoose.model('server_name', serverSchema);

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
    sid: {type: String,required: true},
    uid: {type: String,required: true},
    name: {type: String,required: true},
    status:{ type: String,required: true,enum: ['0', '1', '2']}
});

const Player = mongoose.model('Player', playerSchema);

// Route to get all servers
app.get('/serverGet', async (req, res) => {
    tempUid=url.parse(req.url, true).query.uid;
    console.log(tempUid);
    try { 
        while(true)
        {
        tempCode=generateCode();
        const host = await Host.find({sid:tempCode});
        if(host[0]==null){
            const newHost = new Host({ sid: tempCode,uid:tempUid });
            const result = await newHost.save(); 
            code={"val":tempCode};
            console.log("host add"+code.val+result);
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
            //console.log("hhha"+code.val+result);
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

app.get('/join', async (req, res) => {
    Usid=url.parse(req.url, true).query.sid;
    Uuid=url.parse(req.url, true).query.uid;
    const  userName= await User.find({uid:Uuid});
    const newPlayer = new Player({ uid:Uuid ,sid:Usid,name:userName[0].name,status:'1'});
    const result = await newPlayer.save(); 
    console.log(userName);
    
});

app.get('/checkStatus', async (req, res) => {
    try{
    Usid=url.parse(req.url, true).query.sid;
    Uuid=url.parse(req.url, true).query.uid;
    const  PlayerRes= await Player.find({uid:Uuid,sid:Usid});
    if(PlayerRes[0]==null){
    res.json({"val":"1"});
    }
    else{
        res.json({"val":PlayerRes[0].status});
    }
   console.log(Usid+" "+Uuid);
    } catch (error) {
    res.status(500).send('Error fetching servers');
    }
});

app.get('/checkPlayer', async (req, res) => {
    try{
    Usid=url.parse(req.url, true).query.sid;
    
    const  PlayerRes= await Player.find({sid:Usid});
    if(PlayerRes[0]==null)
    {
        res.json({name:null});
    }
    else{
        res.json(PlayerRes);
    }
    console.log(Usid);
    
    } catch (error) {
    res.status(500).send('Error fetching servers');
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
 

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
