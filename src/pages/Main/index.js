import React, { Component } from 'react'
import { Switch,Route,Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Boss from '../Boss'
import BossInfo from '../BossInfo'
import MasterInfo from '../MasterInfo'
import Master from '../Master'
import Message from '../Message'
import User from '../User'
import NotFound from '../NotFound'
import { getRedirectTo } from '../../utils/tools'
import Cookies from 'js-cookie'
import { action_getuser } from '../../redux/actions'
import HeadBar from '../../components/HeadBar'
import NavBar from '../../components/NavBar'
import Chat from '../Chat'
import './main.less'


class Main extends Component {
    
    navList=[
        {
            path:'/boss',
            component:Boss,
            title:'大神列表',
            icon:'master',
            text:'大神'
        },
        {
            path:'/master',
            component:Master,
            title:'老板列表',
            icon:'boss',
            text:'老板'
        },
        {
            path:'/message',
            component:Message,
            title:'消息列表',
            icon:'message',
            text:'消息'
        },
        {
            path:'/user',
            component:User,
            title:'个人中心',
            icon:'user',
            text:'个人中心'
        }

    ]


    componentDidMount(){
        const userId= Cookies.get('userId');
        const { _id }=this.props.user;
        if(userId && !_id ){
            //发送请求获取用户信息
            this.props.action_getuser();
        }
    }

    render() {
        const { userType,header } =this.props.user;
        const userId= Cookies.get('userId');
        if(!userId){
             return <Redirect to="/login"></Redirect>
        }
         
        if(!this.props.user._id){  /*cookie中有userId,但是redux中没有，需要根据cookie中的userId发起请求，实现自动登录*/
            return null;
        }else{ /*表示已经登录过,根据请求的路径来显示不同页面 */
             let path=this.props.location.pathname;
             if(path==='/'){
                path=getRedirectTo(userType,header);
                return  <Redirect to={ path } from='/*'></Redirect>
            }
        }

        const curPath=this.props.location.pathname;

        const currentNav=this.navList.find(nav => nav.path===curPath);
       
        return (
            <div className="main-container">
                { currentNav?<HeadBar title={currentNav.title} />:null }
                <Switch>
                    {this.navList.map((nav,index)=>(<Route path={nav.path} component={nav.component} key={index}/>))}
                    <Route path="/bossInfo" component={ BossInfo } />
                    <Route path="/masterInfo" component={ MasterInfo } />
                    <Route path="/chat/:userid" component={ Chat } />
                    <Route component={ NotFound } />
                </Switch>

                {currentNav ? <NavBar navList={this.navList} userType={userType} unReadCount={this.props.chat.unReadCount}/> : null}
                
            </div>
        )
    }
}

export default connect(
    state=>({user:state.user,chat:state.chat}),
    { action_getuser }
)(Main)
