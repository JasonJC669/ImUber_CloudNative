import React, { Component } from 'react'
import styled from 'styled-components'
import { Redirect } from 'react-router-dom';

import backgroundImage from '../public/first.png'
// eslint-disable-next-line
import api from '../api'

import TextField from '@mui/material/TextField';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-image: url(${backgroundImage});
    background-size: cover;
    background-position: center;
    border: none;
    padding: 0;
`



const Wrapper = styled.div`
    margin: 0 30px;
    background-color: white;
    padding: 20px;
`

const Title = styled.h1`
    font-family: 'Boogaloo';
    font-size: 58px;
    text-align: center;
    margin-bottom: 20px;
`

const Label = styled.label`
    font-family: 'Kalam';
    font-size: 28px;
    margin: 5px;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`

class Links extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: 'Max',
            phone: '0900000000',
            chose_User_type: false,
            passenger_flag: false,
            driver_flag: false,
        }
    }

    handle_Input_name = async event => {
        const name = event.target.value
        this.setState({ name: name })
    }

    handle_Input_phone = async event => {
        const phone = event.target.value
        this.setState({ phone: phone })
    }

    Login = async () => {
        this.setState({ chose_User_type: true })
    }

    Driver_Login = async () => {
        const { name, phone} = this.state
        const driver_info = {name:name, phone: phone}

        await api.driver_login(driver_info) 

        this.setState({ passenger_flag: false, driver_flag: true })
    }

    Passenger_Login = async () => {
        const { name, phone} = this.state
        const passenger_info = {name:name, phone: phone}

        await api.passenger_login(passenger_info) 

        this.setState({ passenger_flag: false, driver_flag: true })
    }

    render() {
        const { name, phone, chose_User_type, passenger_flag, driver_flag } = this.state

        if (passenger_flag) {
            return <Redirect to="/passenger" />;
        }

        if (driver_flag) {
            return <Redirect to="/driver" />;
        }

        if (chose_User_type) {
            return (
                <Container>
                    <Wrapper>
                        <Title>Welcome to ImUber</Title>
                        <Label>Hi {name}! Are you going to be a driver or a passenger today?</Label>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <Button onClick={this.Driver_Login}>司機</Button>
                            <Button onClick={this.Passenger_Login}>乘客</Button>
                        </div>
                    </Wrapper>
                </Container>
            )
        }

        return (
            <Container>
                <Wrapper>
                    <Title>Welcome to ImUber</Title>
                    <Label>Please enter your name: </Label>
                    <div style={{
                        margin: "auto 30px auto 30px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        height: "100%",
                    }}>
                        <TextField
                            id="standard-search"
                            label="Name"
                            type="search"
                            variant="standard"
                            value={name}
                            onChange={this.handle_Input_name}
                        />
                        <TextField
                            id="standard-search"
                            label="Phone"
                            type="search"
                            variant="standard"
                            value={phone}
                            onChange={this.handle_Input_phone}
                        />
                        <Button onClick={this.Login}>登入</Button>
                    </div>
                </Wrapper>
            </Container>
        )
    }
}

export default Links
