import React, { Component } from 'react'
import './headSeletor.less'
import { List,Grid } from 'antd-mobile'





export default class HeaderSeletor extends Component {
    
    headerList=[]
    

    state={
        icon:null
    }
    
    componentDidMount(){
        
        for(let i=1;i<21;i++){
            this.headerList.push({
                text:`头像${i}`,
                icon:require(`../../assets/headerIcons/头像${i}.png`)
            })
        }
        
        
    }
    
    chooseHeader=({icon,text})=>{
        this.setState({icon},()=>{
            this.props.setHeader(text)
        })
    }

    render() {

        const listheader=this.state.icon?(<div className="icon-wraper">
            <span className="icon-label">已选头像</span>
            <span className="selected-icon"><img src={this.state.icon} alt=""/></span>
            </div>):"请选择头像"
        return (
            <div className="header-seletor-container">
                <List renderHeader={()=>listheader}>
                    <Grid 
                        data={this.headerList}
                        columnNum={5}
                        onClick={this.chooseHeader}
                    />
                </List>
            </div>
        ) 
    }
}
