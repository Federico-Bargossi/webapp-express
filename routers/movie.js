const express = require("express");
const movieController = require("../controllers/movieController");


const router = express.Router();


//definisco le rotte
//INDEX
router.get("/", movieController.index);
//SHOW
router.get("/:id" , movieController.show);


module.exports = router;