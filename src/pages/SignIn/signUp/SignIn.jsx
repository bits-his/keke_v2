import React, { useState } from 'react'
import { Col, Row } from 'reactstrap'
import InputForm from '../../Component/InputForm';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

export default function SignIn() {
    const [form, setForm] = useState({
        email: '',
        password: ''
    })
    const [display, setDisplay] = useState(false)

    const handleChange = ({ target: { name, value } }) => {
        setForm((p) => ({ ...p, [name]: value }));
        console.log(form)
    };

  return (
    <div>
        
        <Row>
            <Col md={12}>
                <InputForm 
                    label= 'Email'
                    placeholder= 'Email'
                    type= 'email'
                    Value= {form.email}
                    name= 'email'
                    onChange={handleChange}
                />
            </Col>
            <Col md={12}>
                <InputForm 
                    label= 'Password'
                    placeholder= 'password'
                    type={display ? 'text' : 'password'}
                    Value= {form.password}
                    name = 'password'
                    onChange={handleChange}
                />
                <div className='dispaly_icon'>
                    {
                        display? <AiOutlineEye onClick={() => setDisplay(!display)}/> : <AiOutlineEyeInvisible onClick={() => setDisplay(!display)}/>
                    }
                </div>
            </Col>
            <Col md={12} className='forget_password'>
                <label style={{fontWeight: 'lighter'}}>
                    <input 
                        type='checkbox'
                        style={{marginRight: 10}}
                    />
                    Remember Me
                </label>
                <p className='forget_password_para'>Forgot Password?</p>
            </Col>
            <div>
                <button className='signin_ghost'> Sign in</button>  
            </div>
        </Row>
    </div>
  )
}
