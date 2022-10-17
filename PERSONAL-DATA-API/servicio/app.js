const Express = require('express');
var body_parser = require('body-parser');

const app = new Express();
app.use(body_parser.urlencoded({extended:false}));
app.use(body_parser.json());


const PORT = process.env.PORT || 3000;//esto pilla el puerto del entorno para ambiente pro , cuando se sube a un serv de HOSTING

//console.log(db);

//CRUD
app.get('/api/:id',(req,res)=>{
    const id = req.params.id;
    res.send("Se ha consultado el id: " + JSON.stringify(id));
});
app.post('/api/', (req, res) => {

    //Leo los datos del JSON
    var id = req.body[0].id || '';
    var nombre = req.body[0].first_name || '';
    var apellido= req.body[0].last_name || '';
    var email= req.body[0].email|| '';
    var genero= req.body[0].gender || '';
    console.log('DATOS RECIBIDOS:',req.body);
    console.log("ID: " + id);


    //Verifico que no exista ninguno que contenga caracteres raros prohibidos o vacios
    if(id == '' || nombre == '' || apellido == '' ||email == '' ||genero == ''){
        res.send("INVALID_PARAMS_ERROR");
    }else{
        res.send("Se esta procesando su solicitud");
    }
})
app.put('/api/:id', (req, res) => {
    const id = req.params.id;
    res.send("Se va ha modificar el id: " + JSON.stringify(id));
});
app.delete('/api/:id', (req, res) => {
    const id = req.params.id;
    res.send("Se va ha borrar el id: " + JSON.stringify(id));
})

//ahora vamos a escuchar
app.listen(PORT,()=>{
    console.log('SERVER_SATUTS:LISTEN AT ',PORT);
});