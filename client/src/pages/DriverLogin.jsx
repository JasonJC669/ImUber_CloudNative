import React, { Component } from 'react'
import api from '../api'
import styled from 'styled-components'
import backgroundImage from '../public/first.png'
import { Redirect } from 'react-router-dom';


import './Driver_road'


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url(${backgroundImage});
  background-size: cover;
`

const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 30px;
    background-color: white;
    padding: 20px;
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


class DriverLogin extends Component {
    constructor(props) {
        super(props)

        this.state = {
            account_number: '',
            password: '',
            shouldShowLinks: false,
        }
    }

    handle_Input_account_number = async event => {
        const account_number = event.target.value
        this.setState({ account_number })
    }

    handle_Input_password = async event => {
        const password = event.target.value
        this.setState({ password })
    }

    handleInputAccountNumber = (event) => {
        this.setState({ account_number: event.target.value })
    }
    
    handleInputPassword = (event) => {
        this.setState({ password: event.target.value })
    }



    DriverLogin = async () => {
        const { account_number, password } = this.state
        // const { history } = this.props
    
        const payload = { account_number, password }
    
        try {
          await api.Driver_login(payload)
          window.alert(`Driver login successfully`)
          this.setState({ account_number: '', password: '' })
        } catch (err) {
          window.alert(`Driver login error`)
          this.setState({ account_number: '', password: '', shouldShowLinks: true })
        }
      }



    render() {
        const { account_number, password, shouldShowLinks } = this.state

        if (shouldShowLinks) {
            return <Redirect to="/UBER/DRIVER/DRIVERROAD" />;
        }

        return (
            <Container>
                <Wrapper>
                    <Title>Driver</Title>

                    <Label>帳號: </Label>
                    <InputText
                        type="text"
                        value={account_number}
                        onChange={this.handle_Input_account_number}
                    />

                    <Label>密碼: </Label>
                    <InputText
                        type="text"
                        value={password}
                        onChange={this.handle_Input_password}
                    />

                    <Button onClick={this.DriverLogin}>登入</Button>
                </Wrapper>
            </Container>
        )
    }
}

export default DriverLogin