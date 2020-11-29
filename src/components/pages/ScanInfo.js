import React from 'react'
import { Card, Container } from 'react-bootstrap';
import Moment from 'react-moment';


const ScanInfo = ({barcodeInput,employee,location}) => {
    return (
        <Container style={{backgroundColor:'white',padding:'30px'}}>
            <h3 className='grey-text'>Results</h3>
            <div style={{ width: '100%' }}>
                <img id="ims" width="100px" style={{marginLeft:'40%'}}/>
            </div>
            {employee ? (
                employee.length ? (
                    <Card style={{marginTop:'30px',color:'black'}}>
                        <Card.Body>
                            <Card.Title>{employee[0].fname + ' ' + employee[0].lname}</Card.Title>
                            <Card.Text>User ID: {employee[0].id}</Card.Text>
                            <Card.Text>Date: <Moment>{ new Date()}</Moment></Card.Text>
                            <Card.Text>Location: {location.lat},{location.long}</Card.Text>
                            {/* <p style={{paddingLeft:'50px'}}>{location.lat},{location.long}</p> */}
                            
                            <Card.Text>Temperature: 40</Card.Text>
                        </Card.Body>
                    </Card>
                ):(null)
            ):(<div style={{paddingBottom:'300px'}}></div>)}
            
            
        </Container>
        
    );
}

export default ScanInfo;