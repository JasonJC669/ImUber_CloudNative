import React, { Component } from 'react'
import styled from 'styled-components'
import backgroundImage from '../public/first.png'
// eslint-disable-next-line
import { Redirect } from 'react-router-dom';

import api from '../api'

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
    font-size: 24px;
    margin-bottom: 20px;
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
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
            ID: '',
            chose_User_type: false,
            driver_flag: false,
            passenger_flag: false,
        }
    }

    handle_Input_ID = async event => {
        const ID = event.target.value
        this.setState({ ID })
    }

    Login = async () => {
        const {ID} = this.state

        this.setState({ ID: ID, chose_User_type: true })
    }


    Driver_Login = async () => {
        const {ID} = this.state
        const Driver_ID = { ID }
    
        await api.Driver_login(Driver_ID)
        //window.alert(`Driver login successfully`)
        this.setState({ ID: '', driver_flag: true })
    }

    Passenger_Login = async () => {
        const {ID} = this.state
        const Driver_ID = { ID }
    
        await api.Passenger_login(Driver_ID)
        //window.alert(`Passenger login successfully`)
        this.setState({ ID: '', passenger_flag: true })
    }



    render() {
        const {ID, chose_User_type} = this.state

        if (chose_User_type) {
            return (
                <Container>
                    <Wrapper>
                        <Title>Welcome to Uber</Title>
                        <Label>ID: </Label>
                            <InputText
                                type="text"
                                value={ID}
                                onChange={this.handle_Input_ID}
                            />

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
                    <Title>Welcome to Uber</Title>
                    <Label>ID: </Label>
                        <InputText
                            type="text"
                            value={ID}
                            onChange={this.handle_Input_ID}
                        />

                        <Button onClick={this.Login}>登入</Button>
                </Wrapper>
            </Container>
        )
    }
}

export default Links
