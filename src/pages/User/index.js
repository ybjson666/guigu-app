import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Result,List,Modal,Button } from 'antd-mobile'
import './user.less'
import { resetuser } from '../../redux/actions'
import Cookies from 'js-cookie'

const Item=List.Item;
const Brief= Item.Brief;

class User extends Component {

    loginOut=()=>{
        Modal.alert('退出','确定退出登陆吗？',[
            {
                text:"取消"
            },
            {
                text:"确认",
                onPress:()=>{
                    Cookies.remove('userId');
                    this.props.resetuser();
                }
            }
        ])
    }

    render() {

        const { user } = this.props
        
        return (
            <div className="user-container">
                <Result 
                    img={<img src={require(`../../assets/headerIcons/${user.header}.png`)} style={{width:50}} alt="header"/>}
                    title={user.userName}
                    message={user.company}
                />
                <List renderHeader={()=>'相关信息'}>
                    <Item multipleLine>
                        <Brief>职位:{user.post}</Brief>
                        <Brief>简介:{user.info}</Brief>
                        {user.salary ? <Brief>薪资:{user.salary}</Brief> : null}
                    </Item>
                </List>
                <Button type="warning" className="logout-btn" onClick={this.loginOut}>退出登录</Button>
            </div>
        )
    }
}

export default connect(
    state=>({user:state.user}),
    { resetuser }
)(User)
