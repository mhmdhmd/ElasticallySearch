const elasticsearch = require('elasticsearch');
const express = require('express');
const bodyParser = require('body-parser');

const client = new elasticsearch.Client({
    hosts: ['http://localhost:9200']
});

const app = express();

client.ping({
    requestTimeout: 250000
}, function(error){
    if(error)
        console.log('Elasticsearch service is DOWN!');
    else
        console.log('OK');
});

app.use(bodyParser.json());
app.set('port', process.env.PORT || 3001);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/search', function(req, res){
    let body = {
        size: 200,
        from: 0,
        query: {
            match_phrase_prefix: {
                name: req.query['searchText']
            }
        }
    }

    client.search({index:'hmd-data', body: body, type:'persons'})
        .then(results => {
            res.send(results.hits.hits);
        })
        .catch(err => {
            res.send([]);
        });
});

app.listen(app.get('port'), function() {
    console.log('listening on port ' + app.get('port'));
});
