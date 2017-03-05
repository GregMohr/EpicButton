var express = require('express');
var app = express();
var path = require('path');
var bp = require('body-parser');

app.use(bp.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, './static')));
app.use('/jquery', express.static(path.join(__dirname, './node_modules/jquery/dist/')))
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res){
  res.render('index')
})

var server = app.listen(8000, function(req, res){
  console.log('listening on port 8000');
})

var io = require('socket.io').listen(server);

var counter = 0;

io.sockets.on('connection', function(socket){
  // console.log(counter);
  socket.on('counter_inc', function(){
    counter++;
    io.emit('counter_update', { counter: counter });
  });
  socket.on('counter_reset', function(){
    counter = 0;
    io.emit('counter_update', { counter: counter });
  });
  socket.on('counter_get', function(){
    io.emit('counter_update', { counter: counter });
  });
});
