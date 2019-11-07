import React, { Component } from 'react'
import './navBar.less'
import { TabBar}  from 'antd-mobile'
import { withRouter} from 'react-router-dom'

const Item=TabBar.Item


class NavBar extends Component {

    render() {

        let { navList,userType,unReadCount } =this.props;
        const filterPath=userType==='dashen'?'/boss':'/master';
        navList=navList.filter(nav=>nav.path!==filterPath);
        const path =this.props.location.pathname;

        return (
            <div className="navBar-container">
                <TabBar>
                {
                    navList.map((nav,index)=>(
                        <Item  
                            title={nav.text}
                            key={index}
                            icon={{uri:require(`./images/${nav.icon}.png`)}}
                            selectedIcon={{uri:require(`./images/${nav.icon}-selected.png`)}}
                            badge={nav.path==='/message'?unReadCount:0}
                            selected={path===nav.path}
                            onPress={()=>this.props.history.replace(nav.path)}
                        />

                        
                    ))
                }
                
                </TabBar>
            </div>
        )
    }
}
export default withRouter(NavBar)
