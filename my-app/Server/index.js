const express = require('express');
const cors=require('cors')
const app = express();

const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.static(__dirname+'/img'));
app.use(express.static(__dirname+'/Audio'));
//app.use("/public",express.static(path.join(__dirname, 'img')));
//app.use('/static', express.static('public'));
app.use(bodyParser.json());
var ip=require("../src/ip");
var whitelist = ['http://localhost:8080', 'http://localhost:3000',"http://"+ip+":3000","http://"+ip+":8080"]
var corsOptions = {
  origin: function (origin, callback) {
      console.log(origin)
      console.log(typeof(origin))
    if (typeof(origin)=="undefined" ||  whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
var p2;
fs.readFile(__dirname+'/data.json', 'utf8', (err, jsonString) => {
    if (err) {
        console.log("File read failed:", err)
        return
    }
    p2=JSON.parse(jsonString);
    //console.log('File data:', jsonString) 
    console.log("data: ", p2);
})
// Then pass them to cors:
app.use(cors(corsOptions));
/*var p2={// poner esto en caso de que jsonString.length===0   es decir este vacio 
    "id": 0,
    "contenido": "",
    "mostrar": true,
    "lista": [
        {
            "contenido": "cuadro para diferenciar mejor objetivos ",
            "mostrar": false,
            "id": 18376227,
            "lista": [],
            "fechaInicio": "2019/5/5 21:27:3",
            "fechaFin": "2019/5/5 22:16:49",
            "check": true
        }
      ],
      "score":0
    }
*/
app.get('/api/getRequest', (req, res) => {
 //API logic
    res.json(p2);
 }); 


app.post('/data', (req, res) => {
 //API logic
    //res.send("hola");
    console.log("recivineod post ");
    const user = (req.body);
    p2=user;
    const jsonString = JSON.stringify(user)
    console.log("user",user);
    fs.writeFile(__dirname+'/data.json', jsonString, err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file')
        }
    })

    res.json(jsonString);

 });


app.get('/', (req,res) => {
    //res.send("hola");
    console.log("responde")
    console.log("peticion get / ",p2);
    res.json(p2);
    //res.sendFile(path.join(__dirname, 'build/index.html'));
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
 console.log('escuchado en http://localhost:'+ port);
});