var express = require('express');
var router = express.Router();

var tictactoeController = require('../controller/tictactoe.controller');

router.get('/start', tictactoeController.start);
router.post('/move', tictactoeController.addMove);
router.get('/games', tictactoeController.getIncompleteGame);
router.post('/winOrDrawGame', tictactoeController.winOrDrawGame);


module.exports = router;