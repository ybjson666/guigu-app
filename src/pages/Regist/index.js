import React, { Component } from 'react'
import { NavBar,WingBlank,List,InputItem,WhiteSpace,Button,Radio,Toast} from 'antd-mobile'
import Logo from '../../components/Logo'
import './regist.less' 
import {connect } from 'react-redux'
import { action_register } from '../../redux/actions'
import { reg_pwd } from '../../utils/tools'

const Item=List.Item

 class Regist extends Component {

    state = {
        userName:"",
        passWord:"",
        aginPassword:"",
        userType:"laoban"
    }
    
    handleChange = (type,value) => {
        this.setState({
            [type]:value
        })
    }
    register=()=>{
        
        const { userName,passWord,aginPassword,userType }=this.state;
        
        if(!userName){
            Toast.info("请填写用户名");
            return;
        }else if(!passWord){
            Toast.info("请输入密码");
            return;
        }else if(!reg_pwd.test(passWord)){
            Toast.info("密码格式不正确");
            return;
        }else if(!aginPassword){
            Toast.info("请再次输入密码");
            return;
        }else if(passWord!==aginPassword){
            Toast.info("两次密码不一致");
            return;
        }

        this.props.action_register( { userName,passWord,userType },()=>{
            const { msg,redirectTo } =this.props.user;
            Toast.info(msg);
            setTimeout(()=>{
                if(redirectTo){
                    this.props.history.replace(redirectTo)
                }
            },2500)
        } )
    }
    goLogin=()=>{
        this.props.history.replace('/login') 
    }   

    render() {
       
        return (
            <div className="regist-container">
                <NavBar>硅&nbsp;谷&nbsp;直&nbsp;聘</NavBar>
                <Logo/>
                <div className="contents">
                    <WingBlank>
                        <List>
                            <WhiteSpace />
                            <InputItem 
                                onChange={ val=>{this.handleChange('userName',val)}}
                                placeholder="请输入用户名"
                            >用户名</InputItem>
                            <WhiteSpace />
                            <InputItem 
                                type="password" 
                                onChange={ val=>{this.handleChange('passWord',val)}}
                                placeholder="密码为6-8位数字加字母组合"
                            >密码</InputItem>
                            <WhiteSpace />
                            <InputItem 
                                type="password" 
                                onChange={ val=>{this.handleChange('aginPassword',val)}}
                                placeholder="请再次输入密码"
                            >确认密码</InputItem>
                            <WhiteSpace />
                            <Item>
                                <span>用户类型</span>
                                <Radio 
                                    style={{marginRight:"2rem",marginLeft:"1rem"}}
                                    onChange={ ()=>{this.handleChange('userType','laoban')}}
                                    checked={this.state.userType==='laoban'}
                                >老板</Radio>
                                <Radio 
                                    onChange={ ()=>{this.handleChange('userType','dashen')}}
                                    checked={this.state.userType==='dashen'}
                                >大神</Radio>
                            </Item>
                            <WhiteSpace />
                            <Item>
                                <Button type="primary" onClick={this.register}>注册</Button>
                                <WhiteSpace />
                                <Button onClick={this.goLogin}>已有账号</Button>
                            </Item>
                        </List>
                    </WingBlank>
                </div>
            </div>
        )
    }
}

export default connect(
    state =>({
            user:state.user
        }),
    { action_register}
)(Regist)