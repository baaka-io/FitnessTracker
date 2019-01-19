import React from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Timer from "tiny-timer";
import Exercises from "./Exercises"
import {
    TabBar,
    Tabs,
    Tab
} from "./TabBar"
import {
    FlatButton
} from "./Button"

const AppBar = styled.div`
    display: flex;
    padding: 0 20px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
`
const AppBarTitle = styled.h2``

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
`
const Stopwatch = styled.span`
    margin: 10px auto;
    font-size: 1.5em;
`
export default class Workout extends React.Component{

    constructor(){
        super()
        this.state = {
            duration: null,
            exercises: [
                {
                    name: "Chest flys",
                    sets: [8,8,8],
                    weight: 20,
                }
            ],
            breaks: [
                120,
                120
            ]
        }
    }

    componentDidMount(){
        this.timer = new Timer({ stopwatch: true })
        this.timer.on("tick", ms => {
            this.setState({ ...this.state, duration: Math.round(ms/1000) })
        })
        this.timer.start(60 * 60 * 1000)
    }

    handleBreakRequest(){
        this.timer.pause()
    }

    handleCloseRequest(){
        this.timer.stop()
        this.timer = null
        this.props.onCloseRequest && this.props.onCloseRequest()
    }

    formattedDuration(){
        const duration = this.state.duration
        const timeParts = [
            Math.floor(duration / 360), //hours
            Math.floor(duration / 60),  //minutes
            duration % 60               //seconds
        ]

        return timeParts
            .map(t => t.toString().padStart(2, '0'))
            .join(":")
    }

    render(){
        return <React.Fragment>
            <AppBar>
                <AppBarTitle>New Workout</AppBarTitle>
                <FlatButton onClick={this.handleCloseRequest.bind(this)}>
                    <FontAwesomeIcon icon="times"></FontAwesomeIcon>
                </FlatButton>
            </AppBar>
            <Container>
                <Stopwatch>{this.formattedDuration()}</Stopwatch>
                <Exercises exercises={this.state.exercises}></Exercises>
            </Container>
            <TabBar>
                <Tabs>
                    <Tab onClick={this.handleBreakRequest.bind(this)}>
                        <FontAwesomeIcon icon="pause"></FontAwesomeIcon>
                    </Tab>
                </Tabs>
            </TabBar>
        </React.Fragment>
    }
}