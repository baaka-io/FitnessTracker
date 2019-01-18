import React from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { NavLink } from "react-router-dom";

const AppBar = styled.div`
    position: fixed;
    top: auto;
    bottom: 0;
    width: 100vw;
`

const Tabs = styled.div`
    display: flex;
    width: 100%;
`

const Tab = styled(NavLink)`
    color: grey;
    text-align: center;
    font-size: 1.5em;
    padding: 10px 20px;
    flex-grow: 1;
    text-decoration: none;

    &.active {
        color: black;
    }

`

export default class NavigationTabs extends React.Component{

    constructor(){
        super()
        this.state = {
            selectedTab: 0
        }
    }

    render(){
        return <AppBar>
            <Tabs>
                <Tab to="/" exact>
                    <FontAwesomeIcon icon="home" ></FontAwesomeIcon>
                </Tab>
                <Tab to="/workouts" exact>
                    <FontAwesomeIcon icon="dumbbell" ></FontAwesomeIcon>
                </Tab>
                <Tab to="/user" exact>
                    <FontAwesomeIcon icon="user"></FontAwesomeIcon>
                </Tab>
            </Tabs>
        </AppBar>
    }
}