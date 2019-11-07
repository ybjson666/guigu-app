import React, { Component } from 'react'
import { HashRouter as Router,Route,Switch} from 'react-router-dom'
import { Provider } from 'react-redux'
import store from '../redux/store'

import { Main,Regist,Login } from './routes'


export default class Routers extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Route path="/login" component={Login}></Route>
                        <Route path="/regist" component={Regist}></Route>
                        <Route component={Main} ></Route>
                    </Switch>
                </Router>
            </Provider>
        )
    }
}


