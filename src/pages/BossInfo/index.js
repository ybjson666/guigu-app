import React, { Component } from 'react'
import './bossInfo.less'
import { connect } from 'react-redux'
import { InputItem,TextareaItem,Button,Toast} from 'antd-mobile'
import HeadBar from '../../components/HeadBar'
import HeaderSeletor from '../../components/HeadSelector'
import { action_updateUser} from '../../redux/actions'
import { Redirect } from 'react-router-dom'


 class BossInfo extends Component {

    state={
        post:"",
        company:"",
        salary:"",
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
        const { post,company,salary,info,header} = this.state;

        if(!post){
            Toast.info("请输入职位");
            return;
        }else if(!company){
            Toast.info("请输入公司名称");
            return;
        }else if(!salary){
            Toast.info("请输入薪资要求");
            return;
        }else if(!info){
            Toast.info("请输入职位要求");
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
            return (<Redirect to="/boss"/>)
        }

        return (
            <div className="bossInfo-container">
                <HeadBar title="老板信息完善"/>
                <HeaderSeletor setHeader={this.setHeader}/>
                <div className="info-content">
                    <InputItem placeholder="请输入职位" onChange={val=>{ this.handleChange('post',val) }}>招聘职位：</InputItem>
                    <InputItem placeholder="请输入公司名称" onChange={val=>{ this.handleChange('company',val) }}>公司名称：</InputItem> 
                    <InputItem placeholder="请输入职位薪资" onChange={val=>{ this.handleChange('salary',val) }}>职位薪资：</InputItem>
                    <TextareaItem 
                        title="职位要求："
                        row={ 3 }
                        onChange={val=>{ this.handleChange('info',val) }}
                        placeholder="请输入职位要求"
                    />
                </div>
                
                <Button type="primary" onClick={this.save}>保存</Button>    
                 
            </div>
        )
    }
}

export default connect(
    state=>({user:state.user}),
    { action_updateUser }
)(BossInfo)