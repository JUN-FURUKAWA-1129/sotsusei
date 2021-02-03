var express = require('express');
var router = express.Router();
const assert = require('assert');
let posts = []; // 掲示板データ
const bodyParser = require('body-parser');
const apps = express();

apps.use(bodyParser.urlencoded({ extended: true }));
apps.use(bodyParser.json);


////////////////////////// GETでアクセスされた時の処理 //////////////////////////
router.get('/', function (req, res, next) {
    res.statusCode = 200; // http ステータスコード
    res.setHeader('Content-Type', 'text/html; charset=UTF-8');
    header(req, res);
    res.write('<h2>投稿します</h2>\n');
    res.write('<form action="/up" method="post"><div><textarea name="kakikomi" style="width:80%;height:100px"></textarea><div><div><input type="submit" value="投稿"></div></form>');
    res.end('</body></html>');
    //別途HTMLとCSSを分けるのであれば、置換用文字列に、このファイルのスクリプトで取得した掲示板の投稿データを格納する。その後で、ejsエンジンの機能で置換文字列をhtml(ejs)側にも書いて、投稿データを動的に格納スルことができる
});


////////////////////////// POSTでアクセスされた時の処理 //////////////////////////
router.post('/', (req, res, next) => {
    res.statusCode = 200; // http ステータスコード
    res.setHeader('Content-Type', 'text/html; charset=UTF-8');

    //headタグ
    res.write('<html><head><title>掲示板</title><style>* {box-sizing:border-box;}</style></head>');

    //bodyタグ
    res.write('<body style="position:relative; background-color: #FAFAFA; color: #101419; margin: 0 auto white-space: pre-wrap;">');

    //divタグ(container)
    res.write('<div class="container" style="width: 70%; height: 100vh; margin: 0 auto; text-align: center;">');

    //headerタグ(掲示板のタイトル部分)
    res.write('<header style="background-color: #151862; color: #DFDFDF; padding:10px; text-align:center;"><h1 style="margin: 5px auto;">〇〇掲示板</h1></header>');
  
    
        //JSONデータ(文字列型)をオブジェクト型へパースする
        //1.POSTされたデータをJSONに変換
        var kakikomiData = JSON.stringify({kakikomi: req.body.kakikomi});
	console.log(kakikomiData)

        //2.JSONを文字列型からオブジェクト型に変換
        parsedBody = JSON.parse(kakikomiData);
        console.log("parsedBodyの中身" + parsedBody);

        if (parsedBody) {
            //////////////  ② mongodbに保存する ///////////////////////         
            postKakikomi(parsedBody, () => {
                
                //h2タグ(投稿内容表示)
                res.write('<h2 style="margin: 40px auto;">以下の内容を投稿しました</h2>\n');
                res.write('<p style="white-space: pre-wrap">' + req.body.kakikomi  + '</p>\n');
                
                //aタグ(トップページへ戻るボタン)
                res.write('<p><a href="/board" style="margin: 30px auto 0; width: 50%;  display: inline-block; padding: 0.5em 1em; text-decoration: none; background: #151862; color: #DFDFDF; border-bottom: solid 4px #110954; border-radius: 3px;">掲示板トップへ</a></p>');

                res.write('<p><a href="#" onclick="window.close();" style="margin: 30px auto 0; width: 30%;  display: inline-block; padding: 0.5em 1em; text-decoration: none; background: #C9C9CA; color: #202124; border-bottom: solid 2px #99999A; border-radius: 3px;">ウィンドウを閉じる</a></p>');


                //もろもろの締めタグ
                res.end('</div></body></html>');
            });
        }
});

////////////////////////// mongoDB関連 //////////////////////////
const mongodb = require('mongodb');
const app = require('../app');
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
        callback(docs)
    });
}

////////////////////////// 書き込みを保存 //////////////////////////
var postKakikomi = (json, callback)=> {
        DB.collection('posts').insertOne(json, (err, result) => {
        console.log('inserted');
                callback();
    });
}

module.exports = router;
