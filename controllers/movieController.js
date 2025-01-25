const dbConnection = require("../data/dbConnection")

const index = (req, res) => {
    const sql = "SELECT * FROM `movies`";

    dbConnection.query(sql, (err, movies) => {
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
            status: "succes",
            data: movies,
        });
    });
};

const show = (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM `movies` WHERE `id` = ?";

    dbConnection.query(sql, [id], (err, result) => {
        if (err) {
            const resObj = {
                message: "Errore interno del server"
            }
            if (process.env.ENVIRONMENT === "development") {
                resObj.detail = err.stack;
            }
            return res.status(500).json(resObj);
        };

        //CONTROLLARE SE LA CORRISPONDENZA è STATA TROVATA
        if(result.length === 0) {
            return res.status(404).json({
                status: "fail",
                message: "Film non trovato",
            });
        }
        return res.json({
            data: result[0],
        })
    });
};

module.exports = {
    index,
    show
}