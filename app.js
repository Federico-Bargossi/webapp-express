const express = require("express")
const movieRouter = require("./routers/movie")
const errorHandlers = require("./middleware/errorsHandlers")
const cors = require("cors")


//creazione dell'app express
const app = express();
const port = process.env.SERVER_PORT;

//MIDDLEWARE DELLE CORS
app.use(cors({
    origin: process.env.FRONTEND_URL
}))

//MIDLEWARE PER RENDERE LA CARTELLA PUBBLICA ACCESSIBILE
app.use(express.static("public"))

//DEFINISCO I GRUPPI DELLE ROTTE
app.use("/movies", movieRouter)

//REGISTRO ERROR HANDLER MIDDLEWARE
app.use(errorHandlers);

app.listen(port, () =>{
    console.log(`app è in ascolto on ${port}`)
});

