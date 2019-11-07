import React, { Component } from 'react'
import { NavBar,WingBlank,List,InputItem,WhiteSpace,Button,Toast} from 'antd-mobile'
import Logo from '../../components/Logo'
import './login.less' 
import {connect } from 'react-redux'
import { action_login } from '../../redux/actions'
import { reg_pwd } from '../../utils/tools'


const Item=List.Item

class Login extends Component {
    state={
        username:"",
        password:""
    }
    goRegist=()=>{
        this.props.history.replace('/regist') 
    }
    login=()=>{
        const { userName,passWord } = this.state;
        

        if(!userName){
            Toast.info("请输入用户名");
            return;
        }else if(!passWord){
            Toast.info("请输入密码");
            return;
        }else if(!reg_pwd.test(passWord)){
            Toast.info("密码格式不正确");
            return;
        }
        this.props.action_login({userName,passWord},()=>{
            const { msg,redirectTo} =this.props.user;

            Toast.info(msg);
            
            setTimeout(()=>{
                if(redirectTo){
                    this.props.history.replace(redirectTo)
                }
            },2500)
        });
    }
    handleChange=(type,val)=>{
        this.setState({
            [type]:val
        })
    } 

    render() {
        return (
            <div className="login-container">
                <NavBar>硅&nbsp;谷&nbsp;直&nbsp;聘</NavBar>
                <Logo/>
                <div className="contents">
                    <WingBlank>
                        <List>
                            <WhiteSpace />
                            <InputItem placeholder="请输入用户名" onChange={val=>{this.handleChange('userName',val)}}>用户名</InputItem>
                            <WhiteSpace />
                            <InputItem type="password" placeholder="亲输入密码" onChange={val=>{this.handleChange('passWord',val)}}>密码</InputItem>
                            <WhiteSpace />
                            <WhiteSpace />
                            <Item>
                                <Button type="primary" onClick={this.login}>登录</Button>
                                <WhiteSpace />
                                <Button onClick={this.goRegist}>还没有账户</Button>
                            </Item>
                        </List>
                    </WingBlank>
                </div>
                
            </div>
        )
    }
}

export default connect(
    state => ({user:state.user}),
    { action_login }
)(Login)