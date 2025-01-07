// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const cors= require('cors')
const bodyParser = require('body-parser');

const app = express();
const PORT = 3005;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://prajapatijatin:123456789Ok@cluster0.7dpjd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Define Schema and Model
const serverSchema = new mongoose.Schema({
    sid: { type: String, required: true }
});

const Server = mongoose.model('server_name', serverSchema);

// Route to get all servers
app.get('/serverGet', async (req, res) => {
    try { 
        while(true)
        {
        tempCode=generateCode();
        const servers = await Server.find({sid:tempCode});
        if(servers[0]==null){
            const newServer = new Server({ sid: tempCode });
            const result = await newServer.save(); 
            code={"val":tempCode};
            console.log("hhha"+code.val+result);
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
 

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
