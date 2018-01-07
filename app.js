const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// Get gist route
const router = require('./server/route/route');
const app = express();

// to connect to mogo database
mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);
connect();

function connect() {
    var options = { server: { socketOptions: { keepAlive: 1 } } };
    mongoose.connect('mongodb://localhost:27017/tictactoe', options);
}

/**
 * Create HTTP server.
 */
const server = http.createServer(app);
// Socket.io for real time communication
const io = require('socket.io').listen(server);

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.text({ type: 'text/plain' }));
app.use(function(req, res, next) {
    if (req.headers['content-type'] == "text/plain;charset=UTF-8") {
        req.body = JSON.parse(req.body);
    }
    return next();
});
// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'server')));

// Set our api routes
app.use('/api/', router);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = '3000';
app.set('port', port);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));