import React from "react"
import { Route } from "react-router-dom"
import Home from "./components/Home"
import User from "./components/User"
import Workouts from "./components/Workouts"
import NavigationTabs from "./components/NavigationTabs";
import styled from "styled-components"
import Store from "./redux/store"
import { FIREBASE_INITIALIZE } from "./redux/actions";
import { hot } from "react-hot-loader"

const Container = styled.div`
    height: calc(100vh - 48px);
`

//TODO: Render loading shit while it is trying to authenticate instead of sending to logging page

class App extends React.Component{
    constructor(props){
        super(props)
        Store.dispatch({ type: FIREBASE_INITIALIZE })
    }

    render() {
        return <React.Fragment>
            <Container>
                <Route path="/" component={Home} exact/>
                <Route path="/workouts" component={Workouts} exact/>
                <Route path="/user" component={User} exact/>
            </Container>
            <NavigationTabs></NavigationTabs>
        </React.Fragment>
    }
}

export default hot(module)(App);