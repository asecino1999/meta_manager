const express = require('express');
const cors=require('cors')
const app = express();

const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.static(__dirname+'/img'));
//app.use("/public",express.static(path.join(__dirname, 'img')));
//app.use('/static', express.static('public'));
app.use(bodyParser.json());
var whitelist = ['http://localhost:8080', 'http://localhost:3000',"http://192.168.1.12:3000","http://192.168.1.12:8080"]
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
/*var p1={
        lista: [{contenido: "instlar mongodb" ,checked:false },
                {contenido:"consuktas a a mongo por peticiones de react al api ",checked:false},
                {contenido:"crear express que se conecte con react",checked:true},
                {contenido:"menu desplegable ",checked:true,
                 lista:[// sub menu        
                        {contenido:"enconrar la manra de crear submenu ", checked:true  },
                       
                 ]
                },
                {contenido:"que el submenu sea desplegable ",checked:false},
        ]
}*/


app.get('/api/getRequest', (req, res) => {
 //API logic
    res.json(p2);



 }); 


app.post('/data', (req, res) => {
 //API logic
    //res.send("hola");
    console.log("recivineod post ");
    const user = (req.body);
    const jsonString = JSON.stringify(user)
    console.log(user);
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
    console.log("peticion get / ",p2);
    res.json(p2);
    //res.sendFile(path.join(__dirname, 'build/index.html'));
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
 console.log('escuchado en http://localhost:'+ port);
});