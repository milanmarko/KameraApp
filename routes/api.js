const express = require('express');
const router = express.Router();
const fs = require('fs');

router.post('', (req, res) => {
    const scoreElements = fs.readFileSync('public/scores.txt', 'utf8', (err, data) => {
        if (err) throw err;
    }).split(' ');
    const homeScore = parseInt(scoreElements[0]);
    const awayScore = parseInt(scoreElements[2]);
    const team = req.body.team;
    const point = parseInt(req.body.point);
    if (team === "home"){
        console.log(homeScore);
        fs.writeFileSync("public/scores.txt", `${homeScore+point} - ${awayScore}`, (err) => {});
        res.send({"home": homeScore + point, "away": awayScore});
    }
    else{
        fs.writeFileSync("public/scores.txt", `${homeScore} - ${awayScore+point}`, (err) => {});
        res.send({"home": homeScore, "away": awayScore + point});
    };
})
router.post('/reset/', (req, res) => {
    fs.writeFileSync("public/scores.txt", "0 - 0", (err) => {});
    res.send({"home": 0, "away": 0});
})
router.post('/setAccourateScore/', (req, res) => {
    fs.writeFileSync("public/scores.txt", `${req.body.home} - ${req.body.away}`, (err) => {});
    res.send({"home": parseInt(req.body.home), "away": parseInt(req.body.away)});
})

module.exports = router;