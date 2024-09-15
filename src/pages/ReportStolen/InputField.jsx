import { FormGroup, Label, Col, Input } from "reactstrap";

const InputField = ({label, id, required, handleChange, name, place, type, rows}) => {
    return(
        <>
            <Col md={6} sm={12} className="first-col">
                <FormGroup>
                    <Label for={id}>{label} {required === "true" ? (<span style={{ color: "red" }}>*</span>):("")}</Label>
                    <Input
                        onChange={handleChange}
                        id={id}
                        name={name}
                        placeholder={place}
                        type={type}
                        className="app_input"
                        rows={rows}
                        required
                    />
                </FormGroup>
            </Col>
        </>
    )
}

export default InputField;