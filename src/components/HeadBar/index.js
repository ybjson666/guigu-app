import React from 'react'
import './headBar.less'


export default function HeadBar(props) {
    return (
        <div className="headBar-container">
            <h2 className="title">{props.title}</h2>
        </div>
    )
}
