var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/test';
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/app'));
app.use(express.static(__dirname + '/app/views'));
app.use(bodyParser.json());

var pfad = __dirname + '/app/views';

app.get("/", function(req, res) {

    res.sendFile(pfad + '/main.html');
});


app.post("/studentanlegen", function(req, res) {

    console.log("Body: " + JSON.stringify(req.body));
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server.");

        insertDocument(db, function() {
            db.close();
        });

    });

    var json = req.body;

    var insertDocument = function(db, callback) {
        db.collection('studenten').insertOne(json, function(err, result) {
            assert.equal(err, null);
            console.log("Inserted a document into the restaurants collection.");
            callback(result);

        });
    };

    res.send("OK");

});

app.get("/studentholen", function(req, res) {
    
    var ergebnis = {};

    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);

        getBestStudent(db, function() {
            db.close();
            res.send(ergebnis[0]);
        });

    });
    
    var getBestStudent = function(db, callback) {

        var cursor = db.collection('studenten').find().sort({
            "note": 1
        });
        
        var index = 0;
        cursor.each(function(err, doc) {

            assert.equal(err, null);
            if (doc != null) {
                console.dir(doc);
                ergebnis[index] = doc;
                console.dir("Ergebnis: " + JSON.stringify(ergebnis));
            } else {
                callback();
            }
            index++;
        });
    };

});


app.listen(3131, function() {

    console.log("Test App läuft auf 3131");

});