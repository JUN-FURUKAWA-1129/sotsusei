var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const http = require('http'); // httpサーバーmodule
//const httpserver = require('http').Server(app);

//Applicationオブジェクトの生成
var app = express();


var indexRouter = require('./routes/index'); //routesフォルダ内のindex.jsへアクセス
var boardRouter = require('./routes/board'); //board.jsへのアクセス
var boardUpRouter = require('./routes/boardUp');//boardUp.jsへのアクセス


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//URLごとにアクセスがあった時の処理を記述。('アクセスしてきたURL', 実行するファイルへのパス)
app.use('/', indexRouter);
app.use('/board', boardRouter);
app.use('/up', boardUpRouter);

//エラー時の処理
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});




///////////////////////////////////////////////////////////////////////////
/*
const socketIO = require('socket.io')(httpserver); //記事中のioの代わり
/*
const server = http.Server(app);
var io = socketIO(server);


socketIO.on('connection',function(socket){
  console.log('connected');
});
/*
class Player{
  constructor(obj={}){
    this.id=Math.floor(Math.random()*1000000000);
    this.x=0;
    this.y=-5000;
    this.angle=Math.PI/2;
    this.movement={};
  }

  move(distance){
    this.x+=distance*Math.cos(this.angle);
    this.y+=distance*Math.sin(this.angle);
  }

};

let players={};

io.sockets.on("connection", socket => {
	console.log("socket.ioとの通信成功");
});

setInterval(function(){
  Object.values(players).forEach((player) => {
    const movement = player.movement;
    if(movement.forward){
      player.move(5);
      console.log("forward");
    }
    if(movement.back){
      player.move(-5);
      console.log("back");
    }
    if(movement.left){
      player.angle -= 0.1;
      console.log("left");
    }
    if(movement.right){
      player.angle += 0.1;
      console.log("right");
    }
  });
  io.sockets.emit("state",players);
},1000/30);
*/
///////////////////////////////////////////////////////////////////////////
module.exports = app;
