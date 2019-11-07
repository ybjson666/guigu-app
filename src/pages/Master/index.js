import React, { Component } from 'react'
import { connect } from 'react-redux'
import './master.less'
import UserList from '../../components/UserList'
import { action_getUserList } from '../../redux/actions'


class Master extends Component {

    componentDidMount(){
      
        this.props.action_getUserList('laoban');
    }


    render() {
        return (
            <div className="master-container">
                <UserList userList={this.props.userList}/>
            </div>
        )
    }
}

export default connect(
    state=>({userList:state.userList}),
    {action_getUserList}
)(Master)
