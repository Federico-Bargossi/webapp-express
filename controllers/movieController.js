const { query } = require("express");
const dbConnection = require("../data/dbConnection")

const index = (req, res, next) => {
    //prelevo query string param per la richerca
    const filters = req.query;
    console.log(filters);

    let sql = "SELECT * FROM `movies`"
    const params = [];
    const condition = [];

    if (filters.search) {
        condition.push("title LIKE ?");

        params.push(`%${filters.search}%`);
    }

    //  if (filters.genre) {
    //    condition.push("genre = ?");
    //
    //      params.push(filters.genre);
    //}

    for (const key in req.query) {
        if (key !== "search") {
            condition.push(`${key} = ?`);
            params.push(req.query[key]);
        }
    }

    if (condition.length > 0) {
        sql += `WHERE ${condition.join(" AND ")}`
        console.log(sql)
        console.log(params)
    }

    dbConnection.query(sql, params, (err, movies) => {
        if (err) {
            return next(new Error("Errore interno del server"));
        }
        return res.status(200).json({
            status: "success",
            data: movies,
        });
    });
};

const show = (req, res, next) => {
    const id = req.params.id;
    const sql = `
    SELECT movies.*, CAST(AVG(reviews.vote) as FLOAT) as vote_avg
    FROM movies
    LEFT JOIN reviews
    ON reviews.movie_id = movies.id
    WHERE movies.id = ?;
    `
    const sqlReviews = `
    SELECT * 
    FROM reviews
    JOIN movies
    ON movies . id = reviews . movie_id
    WHERE movies . id = ?
    `

    dbConnection.query(sql, [id], (err, result) => {
        if (err) {
            return next(new Error("Errore interno del server"));
        }

        //CONTROLLARE SE LA CORRISPONDENZA è STATA TROVATA
        if (result.length === 0) {
            return res.status(404).json({
                status: "fail",
                message: "Film non trovato",
            });
        }
        //PRENDIAMO LE RECENSIONI 
        dbConnection.query(sqlReviews, [id], (err, reviews) => {
            if (err) {
                const resObj = {
                    message: "Errore interno del server"
                }
                if (process.env.ENVIRONMENT === "development") {
                    resObj.detail = err.stack;
                }
                return res.status(500).json(resObj);
            }
            return res.status(200).json({
                status: "success",
                data: {
                    ...result[0],
                    reviews
                }
            })
        })
    })
};

module.exports = {
    index,
    show
}