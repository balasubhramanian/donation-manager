import {Alert as BsAlert} from 'react-bootstrap'
import React from 'react'

export const Alert = (props)=> {
    let className = props.className ? props.className : '';
    if(props.message){
        return <BsAlert className={className} bsStyle={props.type}>{props.message}</BsAlert>;
    }
    return <div></div>
}