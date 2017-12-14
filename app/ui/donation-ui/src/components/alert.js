import {Alert as BsAlert} from 'react-bootstrap'
import React from 'react'

export const Alert = (props)=> {
    
    if(props.message){
        return <BsAlert bsStyle={props.type}>{props.message}</BsAlert>;
    }
    return <div></div>
}