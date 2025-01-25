const index = (req, res) => {
    res.json({
        message: "index movies"
    })
}

const show = (req, res) => {
    res.json({
        message: "show dei movies"
    })
};

module.exports = {
    index,
    show
}