import { AUTH_SUCCESS,
    ERR_MSG,
    RECIVE_USER,
    RESET_USER,
    RECIVE_USER_LIST,
    RECIVE_MSG_LIST,
    RECIVE_MSG,
    MSG_READ
} from './action-types'

import { 
    req_register,
    req_login,
    req_upDateUser,
    req_getUser,
    req_getUserList,
    req_getMsgList,
    req_readMsg
} from '../api';

import io from 'socket.io-client'

import { Toast } from 'antd-mobile'

import { initIo } from '../utils/tools' 

export const authSuccess=( user ) => ({ type:AUTH_SUCCESS,data:user });

export const errmsg=( msg) => ( {type:ERR_MSG,data:msg} );

export const reciveUser=(user)=>({type:RECIVE_USER,data:user})

export const resetuser=(msg) =>({type:RESET_USER,data:msg})

export const reciveUserList=(userList)=>({ type:RECIVE_USER_LIST,data:userList})

export const reciveMsgList=({users,chatMsgs,userId}) =>({type:RECIVE_MSG_LIST,data:{users,chatMsgs,userId}});
export const reciveMsg=(chatMsg,userId) =>({type:RECIVE_MSG,data:{chatMsg,userId}});
export const msgRead=(from,to,count)=>({type:MSG_READ,data:{from,to,count}})

/*获取用户消息列表*/
const  getMsgList= async(dispatch,userId)=>{
    initIo(io,dispatch,userId,reciveMsg);/*初始化socket链接*/
    const res=await req_getMsgList();
    const result =res.data;
    if(result.code===200){
        const { users,chatMsgs } =result.data;
        dispatch(reciveMsgList({users,chatMsgs,userId}))
    }
}

export const action_register = (user,callback) =>{
    return async (dispatch) => {
        const res =await req_register(user);
        const result =res.data;
        if(result.code===200){
            result.data.msg=result.msg;
            getMsgList(dispatch,result.data._id);
            dispatch(authSuccess(result.data));
        }else{
            dispatch(errmsg(result.msg));
        }
        callback();
    }
}

/*登录*/

export const action_login = (user,callback) => {
    return async (dispatch) => {
        const res = await req_login(user);
        const result =res.data;
        if(result.code===200){
            result.data.msg=result.msg;
            getMsgList(dispatch,result.data._id);
            dispatch(authSuccess(result.data));
        }else{
            dispatch(resetuser(result.msg));
        }
        callback();
    }
}

/**获取用户信息 */

export const action_getuser=()=>{
     return async (dispatch) => {
         const res = await req_getUser();
         const result = res.data;
         if(result.code===200){
            getMsgList(dispatch,result.data._id);
            dispatch(reciveUser(result.data));
         }else{
            dispatch(resetuser(result.msg));   //发送同步action
         }
     }
}

/**更新用户信息 */
export const action_updateUser=(user)=>{

    return async (dispatch) =>{
        const res= await req_upDateUser(user);
        const result = res.data;
        Toast.info(result.msg);
        setTimeout(()=>{
            if(result.code===200){
                getMsgList(dispatch,result.data._id);
                dispatch(reciveUser(result.data));
            }else {
                dispatch(resetuser(result.msg));
            }
        },2000)
        
    }
}

/**获取用户列表 */

export const action_getUserList=(userType)=>{
    
    return async (dispatch)=>{
        const res = await req_getUserList(userType);
        const result=res.data;
        if(result.code===200){
            // getMsgList(dispatch);
            dispatch(reciveUserList(result.data))
        }
        
    }
}

/**用户发消息 */

export const action_sendMsg=(msgData)=>{


    return async (dispatch) => {
       
         /*发消息*/
        io.socket.emit('sendMsg',msgData);
    }
}

/**用户读取消息 */

export const action_readMsg=(from,to)=>{

    return async (dispatch) => {
        const res =await req_readMsg(from);
        const result=res.data;
        if(result.code===200){
            const conut = result.data;
            dispatch(msgRead(from,to,conut))
        }
    }
}
