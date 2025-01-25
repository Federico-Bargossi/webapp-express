const express = require("express")
const movieRouter = require("./routers/movie")
const errorHandlers = require("./middleware/errorsHandlers")


//creazione dell'app express
const app = express();
const port = process.env.SERVER_PORT;


//DEFINISCO I GRUPPI DELLE ROTTE
app.use("/movies", movieRouter)

//REGISTRO ERROR HANDLER MIDDLEWARE
app.use(errorHandlers);

app.listen(port, () =>{
    console.log(`app è in ascolto on ${port}`)
});

