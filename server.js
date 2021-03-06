//Include our various dependencies for this demo and set up socket.io to work with express
var express = require('express')
    , app = express.createServer()
    , io = require('socket.io')
    , socket = io.listen(app)
    , version = '1.2.awesomer';

//Handle the connect event for the socket.io server in order to send out the 
//current codebase version to any connecting clients.
socket.on('connection', function(client) {
    client.send({
        event: 'version'
        , data: version
    });
});

//Tell express where to find our jQuery library
app.use(express.static('./public'));

//Setup express to render index.jade to any client requesting '/'. 
app.get('/', function (req, res) {
    res.render('index.jade', { 
        locals: { version: version }    //Send the version variable we defined above to the template
        , layout: false                 //Tells jade we aren't going to use a layout.jade base template
    });
});

//Make express hang out and listen for incoming connections
app.listen(8000);
