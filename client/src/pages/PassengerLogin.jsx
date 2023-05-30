import React, { Component } from 'react'
import api from '../api'
import styled from 'styled-components'
import backgroundImage from '../public/first.png'

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


class PassengerLogin extends Component {
    constructor(props) {
        super(props)

        this.state = {
            account_number: '',
            password: '',
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

    PassengerLogin = async () => {
        const { account_number, password } = this.state

        const payload = { account_number, password }

        await api.Passenger_Login(payload)
            .then(res => {
                window.alert(`Passenger login successfully`)

                this.state = {
                    account_number: '',
                    password: '',
                }
            })
            .catch(err => {
                window.alert(`Passenger login error`)

                this.state = {
                    account_number: '',
                    password: '',
                }
            }
            )

    }



    render() {
        const { account_number, password } = this.state
        return (
            <Container>
                <Wrapper>
                    <Title>Passenger</Title>

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

                    <Button onClick={this.PassengerLogin}>登入</Button>
                </Wrapper>
            </Container>
        )
    }
}

export default PassengerLogin