import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    TabBar,
    Tabs,
    NavTab
} from "./TabBar"

export default class NavigationTabs extends React.Component{
    render(){
        return <TabBar>
            <Tabs>
                <NavTab to="/" exact>
                    <FontAwesomeIcon icon="home" ></FontAwesomeIcon>
                </NavTab>
                <NavTab to="/workouts" exact>
                    <FontAwesomeIcon icon="dumbbell" ></FontAwesomeIcon>
                </NavTab>
                <NavTab to="/user" exact>
                    <FontAwesomeIcon icon="user"></FontAwesomeIcon>
                </NavTab>
            </Tabs>
        </TabBar>
    }
}