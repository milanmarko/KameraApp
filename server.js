const express = require('express');
const app = express();
const api = require('./routes/api');
const bodyParser = require('body-parser');
const fs = require('fs');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api/", api);

app.get('/', (req, res) => {
    const scoreElements = fs.readFileSync('public/scores.txt', 'utf8', (err, data) => {
        if (err) throw err;
    }).split(' ');
    const homeScore = scoreElements[0];
    const awayScore = scoreElements[2];
    res.render('index/index', { homeScore: homeScore, awayScore: awayScore });
})
// app.get('/setScore')
// TODO pontos eredmény

app.listen(1234);

