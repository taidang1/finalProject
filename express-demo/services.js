const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const DBNAME = 'library';

const dbURI = 'mongodb+srv://tdang4498:Dcmthangancap1@snakegame.ikyfd.mongodb.net/snakegame?retryWrites=true&w=majority'

let services = function(app) {
    app.post('/add-record', function(req, res) {
        console.log('abc')
        let data = {
            playerName : req.body.playerName,
            level : req.body.level,
            score : req.body.score
        };
    
        MongoClient.connect(dbURI, { useUnifiedTopology: true }, function(err, client) {
            if (err) {
                return res.status(200).send(JSON.stringify({msg:'Error: ' + err}));
            } else {
                let dbo = client.db(DBNAME);
    
                dbo.collection('test').insertOne(data, function(err, response) {
                    if (err) {
                        client.close();
                        return res.status(200).send(JSON.stringify({msg:'Error: ' + err}));
                    } else { 
                        client.close();
                        return res.status(200).send(JSON.stringify({msg:'SUCCESS'}));
                    }
                })
            }
        })
    })

    app.get('/read-record', function(req, res) {
        console.log('abc111')

        MongoClient.connect(dbURI, { useUnifiedTopology: true }, function(err, client) {
            if (err) {
                return res.status(200).send(JSON.stringify({msg:'Error: ' + err}));
            } else {
                let dbo = client.db(DBNAME);
                let mySort = { level: -1, score: -1 }
                dbo.collection('test').find().sort(mySort).toArray(function(err, rows) {
                    if (err) {
                        client.close();
                        return res.status(200).send(JSON.stringify({msg:'Error: ' + err}));
                    } else { 
                        console.log('get successful')
                        client.close();
                        return res.status(200).send(JSON.stringify({msg:'SUCCESS', books:rows}));
                    }
                })
            }
        })
    });
}

module.exports = services;