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
    res.json({
        message: "show dei movies"
    })
};

module.exports = {
    index,
    show
}