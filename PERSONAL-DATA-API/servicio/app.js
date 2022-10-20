
//DEFINITIONS
const Express = require('express');
const body_parser = require('body-parser');
const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017";// Connection URI
const client = new MongoClient(uri);
const PORT = process.env.PORT || 3000;//esto pilla el puerto del entorno para ambiente pro , cuando se sube a un serv de HOSTING
const app = new Express();

//APP USES
app.use(body_parser.urlencoded({extended:false}));
app.use(body_parser.json());

//FUNCTIONS SPACE
async function run() {
    try {
        // Connect the client to the server (optional starting in v4.7)
        await client.connect();
        // Establish and verify connection
        await client.db("base_datos").command({ ping: 1 });
        console.log("Connected successfully to server");
    } catch (error) {
        // Ensures that the client will close when you finish/error
        console.log(error);
    }
}
async function findOneById(client, _id,res) {
    const result = await client.db("base_datos").collection("datos").findOne({ id:_id });
    if (result) {
        console.log(`Found a listing in the collection with the id '${_id}':`);
        console.log(result);
        res.send(result);
    } else {
        console.log(`No listings found with the id '${_id}'`);
        res.send("NOT FOUND");
    }
}
async function insertOneElement(client,entry,res){
    const result = await client.db("base_datos").collection("datos").insertOne(entry);
    if(result){
        console.log(`New listing created with the following id: ${result.insertedId}`);
        res.send("SUCCESFULL");
    }else{
        console.log("Error inserting new entry");
        res.send("ERROR INSERTING");
    }

}
async function updateOneElementById(client,_id,entry,res) {
    const result = await client.db("base_datos").collection("datos")
        .updateOne({ id: _id }, { $set: entry });
    var found = result.matchedCount;
    var modified = result.modifiedCount;
    console.log(`${found} document(s) matched the query criteria.`);
    console.log(`${modified} document(s) was/were updated.`);
    //DUDA , DONDE TENDRIA QUE PONER ESTOS 2 SEND??
    //res.send(`${found} document(s) matched the query criteria.`)
    //res.send(`${modified} document(s) was/were updated.`);
    res.send("SUCCESS");
}
async function deleteOneElementById(client,_id,res) {
    const result = await client.db("base_datos").collection("datos")
        .deleteOne({ id: _id });
    console.log(`${result.deletedCount} document(s) was/were deleted.`);
    res.send("SUCCESS");//modificar esto
}
//RUN
run().catch(console.dir);

//CRUD OPERATIONS
app.get('/api/:id',async (req, res) => {
    const _id = parseInt(req.params.id);
    findOneById(client,_id,res).catch(console.dir);
});
app.post('/api/', async (req, res) => {
    console.log('DATOS RECIBIDOS:',req.body);
    //Verifico que no exista ninguno que contenga caracteres raros prohibidos o vacios
    if(id == '' || nombre == '' || apellido == '' ||email == '' ||genero == ''){
        res.send("INVALID_PARAMS_ERROR");
    }else{
        insertOneElement(client,req.body[0],res);
    }
})
app.put('/api/',async (req, res) => {
    const id = parseInt(req.body[0].id);
    console.log('DATOS RECIBIDOS:',req.body);
    updateOneElementById(client,id,req.body[0],res);
});
app.delete('/api/', (req, res) => {
    const id = parseInt(req.body[0].id);
    deleteOneElementById(client,id,res);
})

//LISTEN
app.listen(PORT,()=>{
    console.log('SERVER_SATUTS:LISTEN AT ',PORT);
});