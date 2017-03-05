$(document).ready(function(){
  var socket = io.connect();

  socket.emit('counter_get');

  $('#epic').click(function(){
    socket.emit('counter_inc');
  });

  $('#reset').click(function(){
    socket.emit('counter_reset');
  });

  socket.on('counter_update', function(data){
    counter = data.counter;
    $('#counter').text(counter);
  })
});
