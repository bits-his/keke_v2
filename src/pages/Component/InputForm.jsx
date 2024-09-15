import React from 'react'
import { Input, Label } from 'reactstrap'

export default function InputForm(props) {
  return (
    <div style={{display: "flex", flexDirection: 'column'}}>
        {props.label&&
        <Label className='Label mt-2'> 
        {props.label} {props.required&&<span className='text-danger'>*</span>}</Label>}
        <input {...props} className= "app_input"/>
    </div>
  )
}

