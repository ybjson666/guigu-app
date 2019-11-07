import { combineReducers } from 'redux'
import { AUTH_SUCCESS,
    ERR_MSG,
    RECIVE_USER,
    RESET_USER,
    RECIVE_USER_LIST,
    RECIVE_MSG_LIST,
    RECIVE_MSG,
    MSG_READ
} from './action-types'
import { getRedirectTo } from '../utils/tools'
/*reducer里面不能直接修改数据，只有用对象或数组扩展符的方法去修改数据，所以下面大量用到{...}的形式*/
const initUser={
    userName:"",
    userType:"",
    msg:"",
    redirectTo:""
}

const user=(state=initUser,action)=>{
    switch(action.type){
        case AUTH_SUCCESS :
            // localStorage.setItem('user',JSON.stringify(action.data))
            const { userType,header } =action.data;
            return {...action.data,redirectTo:getRedirectTo(userType,header)}
        case ERR_MSG :
            return {...state, msg:action.data,redirectTo:''}
        case RECIVE_USER:
            return action.data
        case RESET_USER :
            return {...initUser, msg:action.data}
        default :
            return state
    }

}

/**用户列表 */
const initUserList=[]

const userList=(state=initUserList,action)=>{

    switch(action.type){
        case RECIVE_USER_LIST:
            return action.data
        default:
            return state

    }
}


/**用户聊天 */

const initChat={
    users:{},   //所有用户信息
    chatMsgs:[], //当前用户的所有消息
    unReadCount:0 //总的未读消息数量
}


const chat=(state=initChat,action)=>{

    switch(action.type){
        case RECIVE_MSG_LIST:
            const {users,chatMsgs,userId}=action.data;
            return {
                users,
                chatMsgs,
                unReadCount:chatMsgs.reduce((pretotal,msg)=>pretotal+(!msg.read && msg.to===userId?1:0),0)
            }
        case RECIVE_MSG:
            const {chatMsg}=action.data;
            return {
                users:state.users,
                chatMsgs:[...state.chatMsgs,chatMsg],
                unReadCount:state.unReadCount+(!chatMsg.red&&chatMsg.to===action.data.userId?1:0)
            }
        case MSG_READ :
            const { from ,to ,count } =action.data;
            return {
                users:state.users,
                chatMsgs:state.chatMsgs.map((msg)=>{
                    if(msg.from===from && msg.to===to && !msg.read){
                        return {...msg,read:true}
                    }else{
                        return msg
                    }
                }),
                unReadCount:state.unReadCount-count
            }
        default:
            return state
    }
}




export default combineReducers({
    user,
    userList,
    chat
})


