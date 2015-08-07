var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = express.Router();
var htmlErrors = require('./htmlerrors');
var path = require('path');
var fs = require('fs');
var lbd = require('.' + path.sep + 'lbd.json');

function findByTeam(name){
    var i = 0, l = lbd.length;
    for (; i < l; i++){
        if (lbd[i].team === name){
            return lbd[i]
        }
    }
}

console.log(__dirname);

router.use(express.static(path.join(__dirname, '..' + path.sep, 'public')));

router.post('/dashboard', function(req, res, next){
    var body = req.body;

    if (!body.team){
        return res.send(lbd);
    }

    var row = findByTeam(body.team);

    if (!row){
        next(400);
    }

    row.score += (+body.score);
    row.games++;

    fs.writeFile(path.join(__dirname, '.' + path.sep, 'lbd.json'), JSON.stringify(lbd), function(err, data) {
        if (err){
            return next(err);
        }

        res.send(lbd);
    });
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

app.use(function(err, req, res, next){
    if (typeof err === 'number'){
        err = htmlErrors(err);
    }
    console.info(err);
    res.status(err.status).send(err.message);
});

app.listen(28575);