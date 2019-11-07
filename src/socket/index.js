import io from 'socket.io-client'


const socket=io.connect('ws://localhost:4000');


 /*发消息*/
socket.emit('sendMsg',{name:"tom",date:Date.now()})

console.log('向服务器端发送消息：',{name:'tom',date:Date.now()})

/*接收服务端发的消息*/
socket.on('receiveMsg',(data)=>{
    console.log('接收到服务端的消息',data)
}) 