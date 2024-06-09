import {useState, useRef} from "react";
import { Col, Container, Row } from "react-bootstrap";
import meInfo from "../assets/img/meInfo.png"
import emailjs from '@emailjs/browser';


export const Contact = () => {
    const formInitialDetails = {
        firstName: '',
        lastName: '',
        userEmail: '',
        phone: '',
        message: '',
    }

    const [formDetails, setFormDetails] = useState(formInitialDetails);
    const [buttonText, setButtonText] = useState('Send');

    const formRef = useRef();

    const onFormUpdate = (category, value) => {
       setFormDetails({
        ...formDetails,
        [category]: value,
       }) 
    }

    const handleSubmit = async (e) => {
        
        e.preventDefault();
        if (Object.values(formDetails).every(value => !!value)) {
            setButtonText("Sending...");
    
            emailjs.send("service_#######", "template_#######", {
                from_name: "CalebKryza.dev",
                message: formDetails.message,
                firstName: formDetails.firstName,
                lastName: formDetails.lastName,
                userEmail: formDetails.userEmail,
                phone: formDetails.phone,
            }, {
                publicKey: '############'
            }).then(
                () => {
                    console.log('Email sent successfully!');
                    setButtonText("Sending Success");
                    setFormDetails(formInitialDetails);
                    setTimeout(() => {
                        setButtonText("Send");
                    }, 2000);
                },
                (error) => {
                    console.error('Failed to send email:', error);
                    setButtonText("Sending Failed");
                }
            );
        } else {
            console.log('Please fill in all fields before sending.');
            setButtonText("Sending Failed");
            setTimeout(() => {
                setButtonText("Send");
            }, 1000);
        }
        
      };

    return (
        <section className="contact" id="contact">
            <Container>
                <Row>
                   <Col md={6}>
                    <img src={meInfo} alt="Contact Me"/>
                   </Col>
                   <Col md={6}>
                    <h2>Contact Me</h2>
                    <form ref={formRef} onSubmit={handleSubmit}> 
                        <Row>
                            <Col sm={6} className = "px-1">
                                <input type="text" name="firstName" value={formDetails.firstName} placeholder= "First Name" onChange={(e) => onFormUpdate('firstName', e.target.value)} />
                            </Col>
                            <Col sm={6} className = "px-1">
                                <input type="text" name="lastName" value={formDetails.lastName} placeholder= "Last Name" onChange={(e) => onFormUpdate('lastName', e.target.value)} />  
                            </Col>
                            <Col sm={6} className = "px-1">
                                <input type="email" name="userEmail" value={formDetails.userEmail} placeholder= "Email" onChange={(e) => onFormUpdate('userEmail', e.target.value)} />  
                            </Col>
                            <Col sm={6} className = "px-1">
                                <input type="telephone" name="phone" value={formDetails.phone} placeholder= "Phone No." onChange={(e) => onFormUpdate('phone', e.target.value)} /> 
                            </Col>
                            <Col>
                                <textarea row="6" name="message" value={formDetails.message} placeholder= "Message" onChange={(e) => onFormUpdate('message', e.target.value)} /> 
                                <button type="submit" value="Send" disabled={buttonText === "Sending..."}>
                                    <span>{buttonText}</span>
                                </button>
                            </Col>
                        </Row>
                    </form>
                   </Col>
                </Row>
            </Container>
        </section>
    )
}
