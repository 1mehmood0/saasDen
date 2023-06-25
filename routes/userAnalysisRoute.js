const express = require("express")
const router = express.Router();
const user = require("../db/models/users")

router.get("/stats", getStats)

async function getStats(req, res) {
    console.log(req.query);
    let type = req.query.type;
    if (type == "userPerProvider") {
        const userPerProvider = await user.getUserPerProvider();
        res.status(200).send({
            userPerProvider
        })
    } else {
        res.status(400).send({
            "message": "invalid type"
        })
    }
}

module.exports = router;