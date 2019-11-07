const { ChatModel }=require('../db/models');

module.exports=function (server) {
    const io = require ('socket.io')(server);
    io.on('connection',(socket)=>{
        console.log('socket connected');

        /*接收客户端发的消息*/
        socket.on('sendMsg',(msgData)=>{
            console.log('服务器接收到客户端的消息',msgData);
            const { from,to,content } =msgData;
            /*读取消息并保存*/
            const chat_id=[from,to].sort().join('_');
            const create_time=Date.now();
            new ChatModel({from,to,content,chat_id,create_time}).save((err,chatMsg)=>{
                /*向所有链接上的客户端发消息*/
                io.emit('receiveMsg',chatMsg )
            });
        })
    })


}