const express = require("express")
const movieRouter = require("./routers/movie")


//creazione dell'app express
const app = express();
const port = process.env.SERVER_PORT;


//DEFINISCO I GRUPPI DELLE ROTTE
app.use("/movies", movieRouter)



app.listen(port, () =>{
    console.log(`app è in ascolto on ${port}`)
});

