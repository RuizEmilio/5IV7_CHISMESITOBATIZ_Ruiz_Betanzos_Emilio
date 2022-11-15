const express = require('express');
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('public'));
server.listen(8080, () => console.log('Servidor iniciado en 8080'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function (socket) {
  console.log('socket conectado',socket.id);
  io.emit('conectado', socket.id);

  socket.on('disconnect', () => {
  	console.log('socket desconectado',socket.id);
    io.emit('desconectado', socket.id);
  
  });
  
  socket.on('chat:mensaje' , (data) =>{

      io.emit('chat:mensaje' , data);

  });

  socket.on('mensaje:enviado' , () =>{

    io.emit('mensaje:enviado')
  
  })

  socket.on('chat:escribiendo' , (usuario) =>{

      socket.broadcast.emit('chat:escribiendo' , usuario);

  });

});
