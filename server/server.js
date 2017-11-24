// Set up
var express  = require('express');
var app      = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
// var cors = require('cors');
//var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

 
// Configuration
// mongoose.connect('mongodb://localhost/slnbts');
mongoose.connection.openUri('mongodb://localhost/slnbts')
 
app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
//app.use(methodOverride());

app.listen(8080);
console.log("App listening on port 8080");

var city = mongoose.model('city', {
    to: String,
    rout: String,
    bus: [
        {
            time: String,
            bname: String,
            bnum: String,
            pnum: Number,
            gid:String
        }
    ]
});

app.get('/api/from', function(req, res) {
    
           console.log("fetching reviews");
    
           // use mongoose to get all reviews in the database
           city1.find(function(err, from) {
    
               // if there is an error retrieving, send the error. nothing after res.send(err) will execute
               if (err)
                   res.send(err)
    
               res.json(from); // return all reviews in JSON format
           });
       });


          // application -------------------------------------------------------------
    app.get('*', function(req, res) {
        res.sendfile('../stest/src/pages/about/about.html'); // load the single view file (angular will handle the page changes on the front-end)
    });