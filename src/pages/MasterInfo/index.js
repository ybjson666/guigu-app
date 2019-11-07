import React, { Component } from 'react'
import './masterInfo.less';
import { connect } from 'react-redux'
import HeadBar from '../../components/HeadBar'
import HeaderSeletor from '../../components/HeadSelector'
import { InputItem,TextareaItem,Button,Toast } from 'antd-mobile'
import { action_updateUser} from '../../redux/actions'
import { Redirect } from 'react-router-dom'

class Master extends Component {

    state={
        post:"",
        info:"",
        header:""
    }

    handleChange=(type,val)=>{
        this.setState({
            [type]:val
        })
    }
    setHeader=(header)=>{
        this.setState({header})
    }
    save=()=>{
        const { post,info,header} = this.state;

        if(!post){
            Toast.info("请输入求职岗位");
            return;
        }else if(!info){
            Toast.info("请输入个人介绍");
            return;
        }else if(!header){
            Toast.info("请选择头像");
            return;
        }
        this.props.action_updateUser(this.state)
    }

    render() {

        const { header } =this.props.user;

        if(header){
            return (<Redirect to="/master"/>)
        }

        return (
            <div className="masterInfo-container">
               <HeadBar title="大神信息完善" />
               <HeaderSeletor setHeader={this.setHeader}/>
               <div className="info-content">
                    <InputItem placeholder="请输入求职岗位" onChange={val=>{ this.handleChange('post',val) }}>求职岗位：</InputItem>
                    <TextareaItem 
                        title="个人介绍："
                        row={ 3 }
                        onChange={val=>{ this.handleChange('info',val) }}
                        placeholder="请输入人介绍"
                    />
                </div>
                <Button type="primary" className="save-btn" onClick={this.save}>保存</Button> 
            </div>
        )
    }
}

export default connect(
    state=>({ user:state.user }),
    { action_updateUser }
)(Master)
