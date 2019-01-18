import React from "react"
import styled from "styled-components"
import store from "../redux/store";
import { AUTH_SIGN_IN } from "../redux/actions";

const Container = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const SignInContainer = styled.div`  
    margin-top: -200px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 300px;
`

const Title = styled.h1`
    text-align: center;
    color: white;
    font-size: 2.5em;
    text-shadow: 1px 0 0 #000, 0 -1px 0 #000, 0 1px 0 #000, -1px 0 0 #000;
`

const SignInWithGoogleButton = styled.button`
    padding: 10px 20px;
    border: 2px solid black;
    background: none;
    font-size: 1.1em;
`

export default class User extends React.Component{
    constructor(){
        super()
        this.state = {
            user: store.getState() && store.getState().currentUser
        }

        store.subscribe(() => {
            this.setState({
                user: store.getState() && store.getState().currentUser
            })
        })
    }

    signIn(){
        store.dispatch({ type: AUTH_SIGN_IN })
    }

    render(){
        const signInForm = <SignInContainer>
            <Title>Sign In</Title>
            <SignInWithGoogleButton onClick={this.signIn}>Sign in with Google</SignInWithGoogleButton>
        </SignInContainer>

        const userProfile = this.state.user && (
            <React.Fragment>
                <span>{this.state.user.displayName}</span>
            </React.Fragment>
        )

        return <Container>
            {
                !this.state.user
                ? signInForm
                : userProfile
            }
        </Container>
    }
}