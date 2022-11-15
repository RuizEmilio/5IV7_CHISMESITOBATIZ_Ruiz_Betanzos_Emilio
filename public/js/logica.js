//Crear una instancia de SocketIO, recibe como parámetro el url del servidor al que se conectará
var socket = io.connect('http://localhost:8080');
var list = document.querySelector(`#not`)
let mensaje = document.getElementById('mensaje');
let usuario = document.getElementById('usuario');
let salida = document.getElementById('salida');
let notificaciones = document.getElementById('notificaciones');
let boton = document.getElementById('enviar');

var clientes = [];

boton.addEventListener('click', function(){
  var data = {
    mensaje: mensaje.value,
    usuario: usuario.value,
  };
  if(mensaje.value === '' || usuario.value === ''){
    alert('Se requiere un mensaje y un usuario para poder ingresar al chat');
  }else{
    mensaje.value = '';
    socket.emit('chat:mensaje', data);
  }
});
mensaje.addEventListener('keydown', function(){
  socket.emit('chat:escribiendo', usuario.value)
});

socket.on('chat:mensaje', function(data){
  salida.innerHTML += `<b>` + data.usuario + `</b>: ` + data.mensaje + `<br>`
  socket.emit('mensaje:enviado' , 'Si se envio');
});

socket.on('mensaje:enviado' , () =>{

  avisos.innerHTML = `<p></p>`

})

socket.on('chat:escribiendo', function(data){
  avisos.innerHTML = `<p><em>` + data + `</em> esta escribiendo ... </p>`
});
//Escuchar al evento 'hola' y realizar cierta accion, recibe como parámetro el id del evento y un callback con la información recibida
socket.on('conectado', function (data) {
  //Notificar al usuario el evento hola
  console.log(data);
  
  clientes.push(data);
  document.querySelector('#notificaciones').innerHTML += '<tr><td>' + clientes[clientes.length - 1] + '</td></tr>';
});

socket.on('desconectado', function (data) {
  //Notificar al usuario el evento hola
  var nuevoContenido = '';
  clientes = eliminar(clientes , data);
  for(let i = 0 ; i < clientes.length ; i ++){

    nuevoContenido += '<tr><td>' + clientes[i] + '</td></tr>';

  }

  document.querySelector('#notificaciones').innerHTML = nuevoContenido;

});

$( document ).ready(function() {
  $('#myModal').modal('show')
});

function configurarEntorno(){

  document.getElementById('nombreUsuarioTitulo').innerHTML = 'Bienvenido ' + document.getElementById('nombreUsuario').value + ' a :';
  document.getElementById('usuario').value = document.getElementById('nombreUsuario').value;
  document.getElementById('usuario').setAttribute('readonly' , 'readonly');
  
}

function eliminar(array, elemento) {
  var resultado = []
  for (var i = 0; i < array.length; i++) {
    if (array[i] !== elemento) {
      resultado.push(array[i]);
    }
  }
  return resultado;
}