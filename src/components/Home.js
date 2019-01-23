import React from "react"
import styled from "styled-components"
import {
    Dialog,
    Slide
} from "@material-ui/core"
import BackgroundImage from "../../assets/home-background.jpg"
import Workout from "./Workout"
import withAuthGuard from "../withAuthGuard"
import store from "../redux/store";

const Container = styled.div`
    height: 100%;
    background-image: url(${BackgroundImage});
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
`
const CallToAction = styled.button`
    border: 1px solid white ;
    background: rgba(0, 0, 0, 0.2);
    padding: 10px 20px;
    font-size: 1.5em;
    color: white;

    &:hover {
        background: rgba(0, 0, 0, 0.4);
    }
`

const dialogTransition = props => <Slide direction="up" {...props}></Slide>

class Home extends React.Component{

    constructor(){
        super()
        this.state = {
            isWorkoutDialogOpen: false,
        }
    }

    handleWorkOutRequest(){
        if(!store.getState().currentUser){
            this.props.history.push("/user")
        }
        else {
            this.setState({ ...this.state, isWorkoutDialogOpen: true })
        }
    }

    handleCloseRequest(){
        this.setState({ ...this.state, isWorkoutDialogOpen: false })
    }

    render(){
        return <Container>
            <CallToAction onClick={this.handleWorkOutRequest.bind(this)}>WORK OUT</CallToAction>
            <Dialog
                fullScreen
                open={this.state.isWorkoutDialogOpen}
                onClose={this.handleCloseRequest.bind(this)}
                TransitionComponent={dialogTransition}
            >
                <Workout
                    onCloseRequest={this.handleCloseRequest.bind(this)}
                ></Workout>
            </Dialog>
        </Container>
    }
}

export default withAuthGuard(Home)