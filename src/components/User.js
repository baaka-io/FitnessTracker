import React from "react"
import styled from "styled-components"
import store from "../redux/store"
import { AUTH_SIGN_IN, AUTH_SIGN_OUT } from "../redux/actions"
import { Button } from "./Button"

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

const UserProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 20px;

  img {
    margin: 20px 0;
    height: 128px;
    width: 128px;
    border-radius: 500px;
  }

  button {
    margin-top: auto;
    margin-bottom: 10px;
  }
`

export default class User extends React.Component {
  constructor() {
    super()
    this.state = {
      user: store.getState() && store.getState().currentUser
    }

    this.unsubscribe = store.subscribe(() => {
      this.setState({
        user: store.getState() && store.getState().currentUser
      })
    })
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  signIn() {
    store.dispatch({ type: AUTH_SIGN_IN })
  }

  signOut() {
    store.dispatch({ type: AUTH_SIGN_OUT })
  }

  render() {
    const signInForm = (
      <SignInContainer>
        <Title>Sign In</Title>
        <Button onClick={this.signIn}>Sign in with Google</Button>
      </SignInContainer>
    )

    const userProfile = this.state.user && (
      <UserProfileContainer>
        <img src={this.state.user.photoURL} />
        <span>{this.state.user.displayName}</span>
        <span>{this.state.user.email}</span>
        <Button onClick={this.signOut}>Sign Out</Button>
      </UserProfileContainer>
    )

    return <Container>{!this.state.user ? signInForm : userProfile}</Container>
  }
}
