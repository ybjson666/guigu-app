import React, { Component } from 'react'
import { NavBar,List,InputItem,Icon,Toast,Grid } from 'antd-mobile'
import { connect } from 'react-redux'
import { action_sendMsg,action_readMsg } from '../../redux/actions'
import QueueAnim from 'rc-queue-anim'
import './chat.less'

const Item=List.Item




class Chat extends Component {

    constructor(props){
        super();
        const emojs=['😃','😄','😁','😆','😅','🤣','😂','😉',
                     '😍','😜','😱','🙄','😬','🤧','😮','😭',
                     '😍','😜','😱','🙄','😬','🤧','😮','😭',
                     '😍','😜','😱','🙄','😬','🤧','😮','😭']
        this.emojis=emojs.map((emoj)=>({text:emoj}))
    }

    state={
        content:"",
        isShow:false
    }
    componentDidMount(){
        window.scrollTo(0,document.body.scrollHeight);
        const { unReadCount } =this.props.chat;
        
        //发请求更新消息未读状态
        if(unReadCount>0){
            const from=this.props.match.params.userid;
            const to =this.props.user._id;
            this.props.action_readMsg(from,to);
        }
        
    }
    componentWillReceiveProps(nextProps){
        const { unReadCount } =nextProps.chat;
        //发请求更新消息未读状态
        if(unReadCount>0){
            const from=this.props.match.params.userid;
            const to =this.props.user._id;
            this.props.action_readMsg(from,to);
        }
    }
    // componentWillUnmount(){//退出之前也要更新
    //     //发请求更新消息未读状态
    //     const from=this.props.match.params.userid;
    //     const to =this.props.user._id;
    //     this.props.action_readMsg(from,to);
    // }
   componentDidUpdate(){
        window.scrollTo(0,this.refs.contents&&this.refs.contents.scrollHeight)
   }
    sendMsg=()=>{
        const from=this.props.user._id;
        const to=this.props.match.params.userid;
        const content=this.state.content.trim();
        if(!content){
            Toast.info("请输入聊天内容");
            return;
        }
        this.props.action_sendMsg({from,to,content});
        this.setState({content:"",isShow:false},()=>{
            let h=this.refs.tabBar.clientHeight;
            let H=this.refs.container.clientHeight;
            this.refs.contents.style.height=(H-h+40)+'px';
        });
    }
    toggleEmojis=()=>{
        this.setState({isShow:!this.state.isShow},()=>{
            let h=this.refs.tabBar.clientHeight;
            let H=this.refs.container.clientHeight;
            this.refs.contents.style.height=(H-h+40)+'px';
        })
    }
    chooseEmojies=(item)=>{
        this.setState({content:this.state.content+item.text})
    }

    closeEmojies=()=>{
        this.setState({isShow:false},()=>{
            let h=this.refs.tabBar.clientHeight;
            let H=this.refs.container.clientHeight;
            this.refs.contents.style.height=(H-h+40)+'px';
        })
    }
    keyDown=(e)=>{
        if(e.keyCode===13){
            this.sendMsg();
        }
    }
    render() {

        const { user } =this.props;
        const { users,chatMsgs } =this.props.chat;
        const meId=user._id;
       
        if(!users[meId]){
            return null
        }
       
        const TargetId=this.props.match.params.userid;
        const curChatId=[meId,TargetId].sort().join('_');
        const msgs=chatMsgs.filter(msg=>msg.chat_id===curChatId);
        const tHeader=users[TargetId].header;
        const tName=users[TargetId].userName;
        const header_pic=require(`../../assets/headerIcons/${tHeader}.png`);
       
        return (
                <div className="chat-container" ref="container">
                <NavBar 
                    className="header-bar"
                    icon={<Icon type="left" size="lg"/>}
                    onLeftClick={()=>{this.props.history.goBack()}}
                >{tName}</NavBar>
                <div className="chat-contents" ref="contents" onClick={this.closeEmojies}>
                    <QueueAnim type="scaleBig   " delay={100}> 
                        <List>
                            {
                                msgs.map((msg,index)=>{
                                    if(TargetId===msg.from){
                                        return(<Item thumb={header_pic} key={index}>{msg.content}</Item>)
                                    }else{
                                        return(<Item className="chat-me" extra="我" key={index}>{msg.content}</Item>)
                                    }
                                })
                            }
                            
                        </List>
                    </QueueAnim>
                </div>
                <div className="am-tab-bar" ref="tabBar">
                    <InputItem  
                        placeholder="请输入" 
                        onChange={val=>this.setState({content:val})}
                        value={this.state.content}
                        onFocus={this.closeEmojies}
                        onKeyDown={this.keyDown}
                        extra={
                            <div>
                                <span role="img" style={{marginRight:5}} onClick={this.toggleEmojis}>😀</span>
                                <span onClick={this.sendMsg}>发送</span>
                            </div>
                    }/>
                    {
                        this.state.isShow?(
                            <Grid 
                                data={this.emojis}
                                columnNum={8} 
                                className="emojis-container"
                                onClick={(item)=>{this.chooseEmojies(item)}}
                            >
                            </Grid>
                        ) : null
                    }
                </div>
                
            </div>
            
        )
    }
}

export default connect(
    state=>({user:state.user,chat:state.chat}),
    { action_sendMsg ,action_readMsg}
)(Chat)