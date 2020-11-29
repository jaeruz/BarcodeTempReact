import React, { useEffect,useState}from 'react'
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap';
import tenor from '../../img/tenor.gif'
import FocusLock from 'react-focus-lock';
import Webcam from "react-webcam";
import { FaWindowClose } from 'react-icons/fa'
import { geolocated } from "react-geolocated";
const ScanPanel = (props) => {
    let imageSrc = null;
    // const [barcodeInput, setBarcodeInput] = useState(null)
    
    
     const handleSubmit = (e) => {
        e.preventDefault();
       
    }

    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user"
    };
    
 
    const webcamRef = React.useRef(null);
    
    const capture = React.useCallback(
        () => {
            let d = new Date()
            let barIn = document.getElementById('idQuery');
            
            if (barIn.value.length == 20) {
                props.setBarcodeInput(barIn.value);
                
                let today = new Date();
                let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getUTCSeconds();
                // let f = today.get
                props.setEmployee(
                    {
                        ...props.employee,
                        currentDate: time + ' ' +date
                    }
                )                
                imageSrc = webcamRef.current.getScreenshot();
                let im = document.getElementById('ims');
                im.src = imageSrc;
                barIn.value = "";
                console.log(imageSrc)
                console.log(props)
                navigator.geolocation.getCurrentPosition((position  ) => {
                    props.setLocation(
                        {
                            lat: position.coords.latitude,
                            long: position.coords.longitude
                        }
                    )
                })
            }
            
           
        },
        [webcamRef]
    );
   
    return (
        <Container style={{backgroundColor:'white',padding:'30px',marginBottom:'30px'}}>
            <h3 className='grey-text'>QR Scan</h3>
            
                    <Form id='search' style={{ marginTop: '40px', marginLeft: '0' }} onSubmit={handleSubmit}>
                    
                    <Form.Group controlId="idQuery">
                        <FocusLock>
                            <Form.Control type="text" placeholder="Scan Barcode" style={{ width: '100%' }} onChange={capture} />
                        </FocusLock>
                    </Form.Group>
                </Form>
       
            <Webcam 
                audio={false}
                height={240}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width="100%"
                videoConstraints={videoConstraints}
                mirrored={true}
            />  
            
            
            {/* <button onClick={capture}>Capture photo</button> */}
            {/* <Image src={tenor} alt="loading" fluid/> */}
            
        </Container>
    );
}

export default geolocated({
    positionOptions: {
        enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
})(ScanPanel);
