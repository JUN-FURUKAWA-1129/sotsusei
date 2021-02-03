var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //('views内のejsファイルの名前', {ejsファイル内の置換文字列に代入する値を連想配列で記述})
  res.render('index', {});  
});



//const socket = io();

module.exports = router;
