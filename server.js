const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(bodyParser.json());
app.use(cors());
let words = fs.readFileSync('dictionary.txt').toString().split("\n");
const port = process.env.PORT || 4000;
app.listen(port, () => console.log('Hello world app listening on port ${port}!'));

console.log(words[4]);

app.get('/dictionary',(req,res) =>
{
    if(words !== null)
    {
        console.log(words);
        let dictionary = JSON.stringify(words);
        res.status(200).json({param : dictionary});
    }
    else {
        res.status(403).json({error:"there was an error"})
    }
});
