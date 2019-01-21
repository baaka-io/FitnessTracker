import React from "react"
import {
    Dialog,
    DialogContent as _DialogContent,
    DialogTitle
} from "@material-ui/core"
import { 
    Tab,
    TabBar,
    Tabs
} from "./TabBar";
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const DialogContent = styled(_DialogContent)`
    display: flex;
    position: relative;
    margin-top: 50px;
`

const TimePicker = styled.input`
    position: absolute;
    border: none;
    border-bottom: 1px solid black;
    right: 20px;
`

export default class WorkoutSettingsDialog extends React.Component{
    constructor(props){
        super(props)

        this.state = Object.assign({}, props.settings)

        this.handleSaveRequest = this.handleSaveRequest.bind(this)
        this.handleCloseRequest = this.handleCloseRequest.bind(this)
        this.handleBreakDurationChange = this.handleBreakDurationChange.bind(this)
    }

    shouldComponentUpdate(props, state){
        if(Object.compare(state, this.state))
            return false
        return true
    }

    handleSaveRequest(){
        this.props.onClose(this.state)
    }

    handleCloseRequest(){
        this.props.onClose(null)
    }

    handleBreakDurationChange(event){
        this.setState({ maxBreakDuration: event.target.value})
    }

    render(){
        return <Dialog 
            fullScreen
            open={this.props.open}
        >
            <DialogTitle>Settings</DialogTitle>
            <DialogContent>
                <label>Break Duration: </label>
                <TimePicker
                    type="time"
                    onChange={this.handleBreakDurationChange}
                    value={this.state.maxBreakDuration}
                    step="1"
                ></TimePicker>
            </DialogContent>
            <TabBar>
                <Tabs>
                    <Tab onClick={this.handleSaveRequest}>
                        <FontAwesomeIcon icon="check"></FontAwesomeIcon>
                    </Tab>
                    <Tab onClick={this.handleCloseRequest}>
                        <FontAwesomeIcon icon="times"></FontAwesomeIcon>
                    </Tab>
                </Tabs>
            </TabBar>
        </Dialog>
    }
}