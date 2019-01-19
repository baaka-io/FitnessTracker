import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import Home from "./components/Home"
import User from "./components/User"
import NavigationTabs from "./components/NavigationTabs";
import styled from "styled-components"
import Store from "./redux/store"
import { FIREBASE_INITIALIZE } from "./redux/actions";
import { hot } from "react-hot-loader"

const Container = styled.div`
    height: calc(100vh - 48px);
`

class App extends React.Component{
    componentWillMount(){
        Store.dispatch({ type: FIREBASE_INITIALIZE })
    }

    render() {
        return <Router>
            <React.Fragment>
                <Container>
                    <Route path="/" component={Home} exact/>
                    <Route path="/user" component={User} exact/>
                </Container>
                <NavigationTabs></NavigationTabs>
            </React.Fragment>
        </Router>
    }
}

export default hot(module)(App);