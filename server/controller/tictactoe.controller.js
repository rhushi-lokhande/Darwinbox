var Tictactoe = require('../model/tictactoe');
var constants = require('../constant/const');

var tictactoeController = {
    start: function(req, res) {
        Tictactoe.create({
            moves: [],
            status: constants.const.GAME_STATUS_INPROCESS,
        }, function(err, game) {
            if (err) {
                return res.send(err);
            }
            return res.send(game);
        })
    },
    getIncompleteGame: function(req, res) {
        Tictactoe.find({ status: constants.const.GAME_STATUS_INPROCESS }).then(
            function(err, games) {
                if (err) {
                    return res.send(err);
                } else {
                    res.send(games);
                }
            }
        )
    },
    addMove: function(req, res) {
        var move = req.body;
        Tictactoe.findById({ _id: move.id }, function(err, game) {
            if (err) {
                return res.send(err);
            }
            game.moves.push({
                user: move.user,
                row_Id: move.row_Id,
                col_Id: move.col_Id,
            });

            game.save(function(err, ugame) {
                if (err) {
                    return res.send(err);
                }
                return res.send(ugame);
            })
        });


    },

    isGameWin: function(moves) {
        for (let i = 0; i < 6; i++) {

        }
    },
    isUsersMove: function(moves, i, j, user) {
        return moves.find(move => {
            return move.row_id === i && move.col_id === j && move.user === user;
        });
    },
    winOrDrawGame: function(req, res) {
        var _game = req.body;
        Tictactoe.findById({ _id: _game.id }, function(err, game) {
            if (err) {
                return res.send(err);
            }
            game.status = _game.win ? constants.const.GAME_STATUS_COMPLETED : constants.const.GAME_STATUS_DRAW;
            game.user = _game.user;
            game.completedTime = Date.now()
            game.save(function(err, ugame) {
                if (err) {
                    return res.send(err);
                }
                return res.send(ugame);
            })
        });
    }
}
module.exports = tictactoeController;