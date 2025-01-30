const express = require("express");
const movieController = require("../controllers/movieController");


const router = express.Router();


//definisco le rotte
//INDEX
router.get("/", movieController.index);
//SHOW
router.get("/:slug" , movieController.show);

//STORE DI UN FILM
router.post("/" , movieController.store);

//CREATE DI UNA REVIEWS
router.post("/:id/reviews", movieController.storeReview);

module.exports = router;