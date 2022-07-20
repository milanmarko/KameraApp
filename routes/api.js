const express = require('express');
const router = express.Router();
const fs = require('fs');

var scoreChanges = [];
var previousScore;

router.post('', (req, res) => {
    const scoreElements = fs.readFileSync('public/scores.txt', 'utf8', (err, data) => {
        if (err) throw err;
    }).split(' ');
    const homeScore = parseInt(scoreElements[0]);
    const awayScore = parseInt(scoreElements[2]);
    scoreChanges.push({homescore: homeScore, awayscore: awayScore});
    const team = req.body.team;
    const point = parseInt(req.body.point);
    if (team === "home"){
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
    homeScore = parseInt(req.body.home);
    awayScore = parseInt(req.body.away);
    if (homeScore > 0 && awayScore > 0){
        fs.writeFileSync("public/scores.txt", `${req.body.home} - ${req.body.away}`, (err) => {});
        res.send({"home": parseInt(req.body.home), "away": parseInt(req.body.away)});
    }
    else{
        res.status(400).send({"error": "The sent scores are not valid!"});
    }
})
router.post('/undo/', (req, res) => {
    if (scoreChanges.length > 0){
        const lastChange = scoreChanges.splice(-1, 1)[0];
        fs.writeFileSync("public/scores.txt", `${lastChange.homescore} - ${lastChange.awayscore}`, (err) => {});
        res.send({"home": lastChange.homescore, "away": lastChange.awayscore});
    }
    else{
        res.status(503).send({"error": "No score changes to undo"});
    }
})

module.exports = router;