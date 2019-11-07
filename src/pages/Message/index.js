import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List,Badge } from 'antd-mobile'
import './message.less'

const Item=List.Item;
const Brief=Item.Brief;



class Message extends Component {

    getLastMsgs=(msgs,userId)=>{
        const lastMsgObjs={};
        msgs.forEach(msg => {
            if(msg.to===userId && !msg.read){
                msg.unReadCount=1
            }else{
                msg.unReadCount=0
            }
            //1.找出每个聊天的lastMsg,并用一个对象来存储{chat_id:lastMsg}
            const chatId=msg.chat_id;

            //获取已保存的lastMsg
            let lastMsg=lastMsgObjs[chatId];

            if(!lastMsg){//没有,当前msg就是所在组的lastMsg
                lastMsgObjs[chatId]=msg;
            }else{//有
                const unReadCount=lastMsg.unReadCount+msg.unReadCount;
                if(msg.create_time  > lastMsg.create_time){ //如果当前的msg创建时间晚于保存的lastMsg的创建时间
                    lastMsgObjs[chatId]=msg;  //将保存的lastMsg替换与当前msg
                }
                //将unReadCount保存到最新的lastMsg中
                lastMsgObjs[chatId].unReadCount=unReadCount;
            }
        });
        
          //2.得到所有lastMsg的数组
          const lastMsgs= Object.values(lastMsgObjs);
        
          // 3.对数组进行排序(按create_time进行降序排序)
          lastMsgs.sort((msg1,msg2)=>{
              return msg2.create_time-msg1.create_time
          })
          return lastMsgs; 
        
    }

    render() {
        
        const { user } =this.props;
        const { users,chatMsgs } =this.props.chat;
      
        const lastMsgs=this.getLastMsgs(chatMsgs,user._id);

        return (
            <div className="message-container">
                <List>
                    {
                        lastMsgs.map((msg,index)=>{
                            const targetId=msg.to===user._id?msg.from:msg.to
                            const targetUser=users[targetId];
                        return( <Item
                                extra={<Badge text={msg.unReadCount} />}
                                thumb={require(`../../assets/headerIcons/${targetUser.header}.png`)}
                                arrow='horizontal'
                                key={index}
                                onClick={()=>{this.props.history.push(`/chat/${targetId}`)}}
                            >{msg.content}<Brief>{targetUser.userName}</Brief>
                            </Item>)
                        })
                    }

                </List>
            </div>
        )
    }
}

export default connect(
    state=>({chat:state.chat,user:state.user})
)(Message)
