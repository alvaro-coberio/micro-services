const Express = require('express');
const app = new Express();
const PORT = process.env.PORT || 3000;//esto pilla el puerto del entorno para ambiente pro , cuando se sube a un serv de HOSTING

//console.log(db);

//CRUD
app.get('/api/:id',(req,res)=>{
    const id = req.params.id;
    res.send("Se ha consultado el id: " + JSON.stringify(id));
});
app.post('/api/:id', (req, res) => {
    const id = req.params.id;
    res.send("Se va ha insertar el id: " + JSON.stringify(id));
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