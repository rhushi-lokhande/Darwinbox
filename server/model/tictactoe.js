var mongoose = require('mongoose');
var move = new mongoose.Schema({
    user: String,
    row_Id: Number,
    col_Id: Number,
    timeStamp: { type: Date, default: Date.now },
});
var tictactoe = new mongoose.Schema({
    moves: [move],
    status: String,
    winerUser: String,
    startTime: { type: Date, default: Date.now },
    completedTime: Date
});
var Tictactoe = mongoose.model("Tictactoe", tictactoe);
module.exports = Tictactoe