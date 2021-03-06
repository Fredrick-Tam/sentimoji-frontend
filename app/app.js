// Importing necessary modules
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var numUsers = 0;

// Creating static path
var __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'public')));

// Setting up the routes
app.get('/', function(req, res){
    res.sendFile(__dirname + '/views/index.html');
});

io.on('connection', function(socket){
    
    numUsers++;

    console.log(numUsers + " user(s) online");

    socket.on('disconnect', function(){
        numUsers--;
        console.log(numUsers + " user(s) online");
    });
});

// Hard coded the port for simplicity at the moment
http.listen(3005, function(){
    console.log('listening on *:3005');
});
