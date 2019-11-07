import React, { Component } from 'react'
import { connect } from 'react-redux'
import './boss.less'
import UserList from '../../components/UserList'
import { action_getUserList } from '../../redux/actions'

class Boss extends Component {

    componentDidMount=()=>{
        this.props.action_getUserList('dashen');
    }
    render() {
        return (
            <div className="boss-container">
               <UserList userList={this.props.userList}/>
            </div>
        )
    }
}

export default connect(
    state=>({
        userList:state.userList
    }),
    {
        action_getUserList
    }
)(Boss)
