import React from 'react';
import logo from '../../assets/images/logo.png'
import './logo.less'

const Logo = () => {
    return (
        <div className="logo-container">
            <img src={logo} alt=""/>
        </div>
    );
}

export default Logo;
