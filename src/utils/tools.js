
export const reg_pwd = /^(?![a-zA-Z]+$)(?!\d+$)(?![\W_]+$)\S{6,20}$/;

export const getRedirectTo=(type,header)=>{
    let path="";
    if(type==='laoban'){
        path=header?'/boss':'/bossInfo'
    }else{
        path=header?'/master':'/masterInfo'
    }
    return path;
}

export const getCookie=(cookie_name)=> {
    var allcookies = document.cookie;
    //索引长度，开始索引的位置
    var cookie_pos = allcookies.indexOf(cookie_name);

    // 如果找到了索引，就代表cookie存在,否则不存在
    if (cookie_pos !== -1) {
        // 把cookie_pos放在值的开始，只要给值加1即可
        //计算取cookie值得开始索引，加的1为“=”
        cookie_pos = cookie_pos + cookie_name.length + 1; 
        //计算取cookie值得结束索引
        var cookie_end = allcookies.indexOf(";", cookie_pos);
        
        if (cookie_end === -1) {
            cookie_end = allcookies.length;

        }
        //得到想要的cookie的值
        var value = unescape(allcookies.substring(cookie_pos, cookie_end)); 
    }
    return value;
}

export const initIo=(io,dispatch,userid,action)=>{
    if(!io.socket){
        io.socket=io.connect('ws://localhost:4000');
        io.socket.on('receiveMsg',(chatMsg)=>{
            // console.log('接收到服务端的消息',chatMsg);
            if(userid===chatMsg.from || userid===chatMsg.to){
                dispatch(action(chatMsg,userid))
            }
        }) 
    }
}