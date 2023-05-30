import React, { Component } from 'react'
import api from '../api'
import styled from 'styled-components'

// import backgroundImage from '../public/first.png'

import './Driver_road'


// const Container = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100vh;
//   background-image: url(${backgroundImage});
//   background-size: cover;
// `

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
// eslint-disable-next-line
const Label = styled.label`
    margin: 5px;
`
// eslint-disable-next-line
const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`
// eslint-disable-next-line
const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`


class Driver_road extends Component {
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

    // handleChangeInputRating = async event => {
    //     const rating = event.target.validity.valid
    //         ? event.target.value
    //         : this.state.rating

    //     this.setState({ rating })
    // }

    handleInputAccountNumber = (event) => {
        this.setState({ account_number: event.target.value })
    }
    
    handleInputPassword = (event) => {
        this.setState({ password: event.target.value })
    }


    Driver_road = async () => {
        const { account_number, password } = this.state
        const { history } = this.props
    
        const payload = { account_number, password }
    
        try {
          await api.Driver_login(payload)
          window.alert(`Driver login successfully`)
          this.setState({ account_number: '', password: '' })
        } catch (err) {
          window.alert(`Driver login error`)
          this.setState({ account_number: '', password: '' })
           history.push('/Driver_road')
        }

      }



    render() {
        return (
            <Wrapper>
                <Title>Sucees</Title>
            </Wrapper>
        )
    }
}

export default Driver_road