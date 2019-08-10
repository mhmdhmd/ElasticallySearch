//type "node initial.js" in terminal to create a client of elasticsearch
//on port 9200 and create hmd-data index
//finally seed data to index

// ******************* run "node initial.js" only once ******************

const elasticsearch = require('elasticsearch');

const persons = require('./persons.json');

const client = new elasticsearch.Client({
    hosts:['http://localhost:9200']
});

client.ping({
    requestTimeout: 25000
}, function(error){
    if(error)
        console.log('Elasticsearch is DOWN!');
    else
        console.log('Ok');
});

client.indices.create({
    index: 'hmd-data'
}, function(error, response, status) {
    if(error)
        console.log(error);
    else
        console.log("created a new index", response);
});

client.index({
    index: 'hmd-data',
    id: '1',
    type: 'persons',
    body:{}
}, function(err, resp, status){
    console.log(resp);
});

var data = [];

persons.forEach(person => {
    data.push({index: {
        _index: "hmd-data",
        _type: "persons"
    }});
    data.push(person);
});

client.bulk({
    index: "hmd-data",
    type: "persons",
    body:data
}, function(err, response){
    if(err)
        console.log("Push persons error", err);
    else
        console.log("persons pushed", response.items);
});
