var express = require('express')


var app = express();

const port = 3000;

/* Middlewares */
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'))

app.get('/',(req,res)=>{
    res.send(`Se accedio correctamente al puerto ${port} `)
})

// app.get('/usuario/saludo',(req,res)=>{
//     res.send(`Hola ${req.query.nombre}`)
// })

// /* POST */
// app.post('/usuario/datos',(req,res)=>{
//     res.send(`nombre = ${req.body.nombre}`)
// })



const usuarioRouter = require('./routes/usuario.route')
app.use("/usuario",usuarioRouter)



app.listen(port,function(){
    console.log("Corriendo en el puerto " + port)
})