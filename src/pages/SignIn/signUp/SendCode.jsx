import React, { useState } from 'react'
import { Col, Row } from 'reactstrap'
import InputForm from '../../Component/InputForm';

export default function SendCode() {
    const [form, setForm] = useState({
        code: '',
    })

    const handleChange = ({ target: { name, value } }) => {
        setForm((p) => ({ ...p, [name]: value }));
        console.log(form)
    };

  return (
    <div >
        <Row>
            <Col md={12}>
                <h2 className='second_header_otp'>Enter OTP</h2>
                <p className='sign_in_para_otp'>We have send you 4 digit code via your phone number</p>
            </Col>
        </Row>
        <Row>
            <Col md={12}>
                <InputForm 
                    type= 'text'
                    Value= {form.code}
                    name= 'code'
                    onChange={handleChange}
                />
            </Col>
            <div>
                <button className='signin_ghost' > Sign Up</button>  
            </div>
        </Row>
    </div>
  )
}