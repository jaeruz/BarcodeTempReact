import React, { useContext,useState,useEffect } from 'react'
import ScanPanel from './ScanPanel'
import ScanInfo from './ScanInfo'
import { Container, Row, Col } from 'react-bootstrap';
import { Redirect } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext';
import { UserContext } from '../../context/UserContext';


const ScanPage = () => {
    const { currentUser, userProfile } = useContext(AuthContext)
    const [barcodeInput, setBarcodeInput] = useState(null)
    const { users, dispatch } = useContext(UserContext)
    const [specificUser, setSpecificUser] = useState(null)

    useEffect(() => {
        const su = users.filter(u => u.id === barcodeInput)
        setSpecificUser(su)
    }, [barcodeInput])

    useEffect(() => {
        console.log(specificUser)
    }, [specificUser])

    const [employee, setEmployee] = useState(
        {
            name: 'Person Name',
            age: 'age',
            currentLocation: 'current location',
            temperature: 'current Temp',
            currentDate: null
        }
    )
    const [location, setLocation] = useState(
        {
            lat: null,
            long:null
        }
    )
    useEffect(() => {
        console.log(barcodeInput)
    }, [barcodeInput])

    if (userProfile != null) {
        if (Object.entries(userProfile).length != 0) {
            return (
                <Container style={{ padding: '30px',marginTop:'80px' }}>
                    <Row>
                        <Col lg={5}>
                            <ScanPanel setBarcodeInput={setBarcodeInput} setEmployee={setEmployee} employee={specificUser} setLocation={ setLocation}/>
                        </Col>
                        <Col lg={7}>
                            <ScanInfo barcodeInput={barcodeInput} employee={specificUser} location={ location}/>
                        </Col>
                    </Row>
                </Container>
            );
        }
    } else {
        return <Redirect to='/' />
    }
    return <div></div>
}

export default ScanPage;