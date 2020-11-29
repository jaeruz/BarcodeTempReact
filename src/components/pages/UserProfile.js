import React,{ useContext } from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Col, Container, Row,Button } from 'react-bootstrap';
import { UserContext } from '../../context/UserContext';
import Avatar from 'react-avatar';
import { FaRegEdit,FaQrcode } from 'react-icons/fa';
import QRCode from 'qrcode.react'
import Modal from 'react-modal'
import Moment from 'react-moment';
import 'moment-timezone';


const UserProfile = (props) => {
    const { users, dispatch } = useContext(UserContext)
    const [specificUser, setSpecificUser] = useState(null)
    const [QRState, setQRState] = useState(false)
    
    
    useEffect(() => {
        let id = props.match.params.id
        const su = users.filter(u => id === u.id)
        setSpecificUser(su)
    }, [users])

    useEffect(() => {
        console.log(specificUser)
    }, [specificUser])
    return ( 
        <Container style={{ padding: '30px 30px 90px 50px', marginTop: '8%', backgroundColor: 'white', color: "black", borderRadius: '5px' }}>
            <Modal isOpen={QRState} onRequestClose={() => setQRState(false)}
                style={
                    {
                        overlay: {
                            backgroundColor: 'rgb(0,0,0,0.5)',
                        },
                        content: {
                            backgroundColor: 'white',
                            border: '0',
                            borderRadius: '4px',
                            bottom: 'auto',
                            minHeight: '35rem',
                            left: '50%',
                            padding: '50px',
                            position: 'fixed',
                            right: 'auto',
                            top: '50%',
                            transform: 'translate(-50%,-50%)',
                            minWidth: '30rem',
                            width: '80%',
                            maxWidth: '40rem'
                        }
                    }
                }>
                <div style={{ display: 'block', margin: '0 auto' }}>
                    {specificUser && specificUser.length ? (
                        <>
                        <QRCode value={specificUser[0].id} style={{ display: 'block', margin: '0 auto', width: '70%', height: '70%' }} />
                        <Button style={{ display: 'block', margin: '30px auto' }}>Download</Button>
                        </>
                    ):(null)}
                    
                </div>
                
            </Modal>
            <h3 style={{paddingTop:'10px',paddingBottom:'30px'}}>Profile</h3>
            {specificUser ? (
                specificUser.length ? (
                    <Row>
                        <Col md={1}></Col>
                        <Col md={3}>
                            <Avatar size="120" name={specificUser[0].fname + ' ' + specificUser[0].lname} round={true} style={{ margin: '30px' }} />
                        </Col>
                        <Col md={6}>
                            <h3>{specificUser[0].fname + ' ' + specificUser[0].lname}</h3>
                            Email: <p>{specificUser[0].email}</p>
                            Adddress: <p>{specificUser[0].address}</p>
                            Last Temperature: <p>{ specificUser[0].lastTemp}</p>
                            Date Added: <p><Moment>{specificUser[0].date.toDate()}</Moment></p>
                        </Col>
                        <Col md={1}>
                            <FaQrcode style={{ fontSize: '50px', marginRight: '10px', cursor: 'pointer' }} onClick={ ()=>setQRState(true)}/>
                        </Col>
                    </Row>
                ):(<p>loading..</p>)
            ):(null)}
            
        </Container>
     );
}
 
export default UserProfile;