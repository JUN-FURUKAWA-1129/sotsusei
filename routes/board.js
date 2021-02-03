var express = require('express');
var router = express.Router();
const assert = require('assert');
let posts = []; // 掲示板データ



/* GETでアクセスされた時の処理 */
router.get('/', function(req, res, next) {
  res.statusCode = 200; // http ステータスコード
  res.setHeader('Content-Type', 'text/html; charset=UTF-8');
  
  
  //headタグ
  res.write('<html><head><title>掲示板</title><style>* {box-sizing:border-box;}</style></head>');
  
  //bodyタグ
  res.write('<body style="position:relative; background-color: #FAFAFA; color: #101419; margin: 0 auto;">');
  
  //divタグ(container)
  res.write('<div class="container" style="width: 70%; height: 100vh; margin: 0 auto; padding: 0;">');

  //headerタグ
  res.write('<header style="background-color: #151862; color: #DFDFDF; padding:10px; text-align:center;">');

  //H1タグ(掲示板のタイトル部分)
  res.write('<h1 style="margin: 5px auto;">〇〇掲示板</h1></header>');
  
  //divタグ(kakikomi-wrapper 書き込みを表示する部分)
  res.write('<div name="kakikomi-wrapper" style="height: 60%; margin-top: 10px; overflow: visible scroll; border: 0.5px solid; border-color: rgba(200, 200, 200, .4); white-space: pre-wrap;">\n');
  
  // 書き込みを取得
  getKakikomi((posts) => {
      //ulタグ
      res.write('<ul style="list-style-type: none; padding: 0;">');
      for (let row of posts) {
        //liタグ(書き込みを表示する)
        res.write('<li style="padding: 15px; border-bottom: 1px solid #888;">' + row.kakikomi + '</li>\n');
      }
      res.write('</ul>');
      
      //div(kakikomi-wrapper)の締め
      res.write('</div>');//
      
      //h2タグ(投稿の入力欄のタイトル？)
      res.write('<h2 style="margin-bottom: 0;">カキコミを入力</h2>\n');
      
      //div(form-container)
      res.write('<div class="form-container" style="widhth: 100%; text-align: center;">');

      //formタグ
      res.write('<form action="/up" method="POST">');

      //textareaタグ(投稿の入力欄の正体)
      res.write('<div><textarea name="kakikomi" style="width:100%; margin: 0 auto; text-align: left; resize: vertical;"></textarea></div>  ');

      //inputタグ(送信ボタン)
      res.write('<div style="text-align: center;"><input type="submit" value="投稿" style="margin: 10 auto 0; width: 50%;  display: inline-block; padding: 0.5em 1em; text-decoration: none; background: #151862; color: #DFDFDF; border-bottom: solid 4px #110954; border-radius: 3px;"></input></div>');
    
      res.write('<p><a href="#" onclick="window.close();" style="margin: 30px auto 0; width: 30%;  display: inline-block; padding: 0.5em 1em; text-decoration: none; background: #C9C9CA; color: #202124; border-bottom: solid 2px #99999A; border-radius: 3px;">ウィンドウを閉じる</a></p>');
      //もろもろの締めタグ
      res.write('</form></div></div></body>');
      
      //スクリプト書くならここから
      //res.end('<script type="text/javascript">{resize: vertical;}</script>')

      res.end('</html>');
  });

});


////////////////////////// mongoDB関連 //////////////////////////

const mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var DB;

////////////////////////// DBへ接続 //////////////////////////
MongoClient.connect('mongodb://127.0.0.1:27017/', function (err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to MongoDB server");
  DB = db.db("board");
});

////////////////////////// 書き込み全件取得 //////////////////////////
var getKakikomi = (callback) => {
  DB.collection('posts').find().toArray((err, docs) => {
    callback(docs);
  });
}

module.exports = router;
