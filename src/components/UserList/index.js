import React, { Component } from 'react'
import { WingBlank,Card,WhiteSpace } from 'antd-mobile' 
import { withRouter } from 'react-router-dom'
import QueueAnim from 'rc-queue-anim'
import './userList.less'

const Header=Card.Header;
const Body=Card.Body;

class UserList extends Component {

    goChat=(id)=>{
        this.props.history.push(`/chat/${id}`);
    }

    render() {
        const { userList} = this.props;
        return (
            <div className="userList-container">
                <QueueAnim type="scaleBig" delay={1000}> 
                    <WingBlank>
                        {
                            userList.map((user,index)=>(
                                <div key={index} onClick={()=>{this.goChat(user._id)}}>
                                    <WhiteSpace/>
                                    <Card >
                                        <Header 
                                            thumb={ <img src={require(`../../assets/headerIcons/${user.header}.png`)} alt="" width="50"/>}
                                            extra={user.userName}
                                        />
                                        <Body>
                                            <div>职位：{user.post}</div>
                                            {user.company?<div>公司：{user.company}</div>:null}
                                            {user.salary?<div>月薪：{user.salary}</div>:null}
                                            <div>描述：{user.info}</div>
                                        </Body>
                                    </Card>
                                    <WhiteSpace/>
                                </div>
                                
                            ))
                        }
                        
                    </WingBlank>
                </QueueAnim>
            </div>
        )
    }
}

export default withRouter(UserList)
