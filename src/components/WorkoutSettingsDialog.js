import React from "react"
import {
    Dialog,
    DialogContent as _DialogContent,
    DialogTitle,
    TextField
} from "@material-ui/core"
import { 
    Tab,
    TabBar,
    Tabs
} from "./TabBar";
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const DialogContent = styled(_DialogContent)`
    margin-top: 50px;
`

export default class WorkoutSettingsDialog extends React.Component{
    constructor(props){
        super(props)

        this.state = Object.assign({}, props.settings)

        this.handleSaveRequest = this.handleSaveRequest.bind(this)
        this.handleCloseRequest = this.handleCloseRequest.bind(this)
    }

    handleSaveRequest(){
    }

    handleCloseRequest(){

    }

    render(){
        return <Dialog 
            fullScreen
            open={this.props.open}
        >
            <DialogTitle>Settings</DialogTitle>
            <DialogContent>
                <TextField
                    type="time"
                    label="Maximal Break Duration"
                    value={this.state.maxBreakDuration}
                    variant="outlined"
                    fullWidth
                ></TextField>
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