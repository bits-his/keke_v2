import React, { useState } from 'react'
import { Label } from 'reactstrap';

export default function InputForm2(props) {
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className={`input-container ${isFocused ? "input-focused" : ""}`} style={{marginTop: 200,}}>
        {props.label&&
        <Label 
            className={isFocused || inputValue ? "label-active" : ""} 
            style={{backgroundColor: '#fff', width: 90, textAlign: 'center'}}
            htmlFor="email-input"
        > 
        {props.label} {props.required&&<span className='text-danger'>*</span>}</Label>}
        <input 
            {...props}
            id="email-input"
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
        />
    </div>
  )
}
