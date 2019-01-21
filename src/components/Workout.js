import React from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Exercises from "./Exercises"
import Config from "../../config.toml"
import ConfirmationDialog from "./ConfirmationDialog"
import { v4 as uuid } from "uuid";
import EditExerciseDialog from "./EditExerciseDialog"
import WorkoutSettingsDialog from "./WorkoutSettingsDialog";
import TimerWorker from "../timer.worker"
import Icon from "../../assets/icon.png"
import {
    TabBar,
    Tabs,
    Tab
} from "./TabBar"

const AppBar = styled.div`
    color: white;
    background-color: ${({isBreak}) => isBreak? "#db3920" : "#333333"};
    height: 50px;
    display: flex;
    align-items: center;
    position: relative;
    padding: 0 20px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
`

const AppBarCancelButton = styled(FontAwesomeIcon)`
    position: absolute;
    font-size: 1.5em;
    right: 5%;
`

const AppBarSettingsButton = styled(FontAwesomeIcon)`
    position: absolute;
    font-size: 1.5em;
    left: 5%;
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 20px;
`

const Stopwatch = styled.span`
    padding: 10px 0;
    margin: 0 auto;
    font-size: 1.5em;
`
export default class Workout extends React.Component{

    constructor(){
        super()
        this.state = {
            duration: null,
            exercises: [],
            exerciseToEdit: {},
            isExercisesDialogOpen: false,
            isEditExerciseDialogOpen: false,
            isSettingsDialogOpen: false,
            isBreak: false,
            breakStartTime: null,
            settings: {
                maxBreakDuration: this.formattedDuration(120)
            },
            maxBreakDurationSeconds: 120
        }


        this.timerWorker = new TimerWorker()

        this.timerWorker.onmessage = message => {
            const time = message.data
            this.setState({ ...this.state, duration: Math.round(time/1000) })
            if(this.state.isBreak && this.state.maxBreakDurationSeconds <= (this.state.duration - this.state.breakStartTime)){
                if(this.state.maxBreakDurationSeconds == (this.state.duration - this.state.breakStartTime)){
                    navigator.serviceWorker.register('sw.js');
                    Notification.requestPermission(function(result) {
                        if (result === 'granted') {
                            navigator.serviceWorker.ready.then(function(registration) {
                                registration.showNotification("You reached your maximum break duration!", {
                                    icon: Icon,
                                    badge: Icon
                                })
                            });
                        }
                    });
                }
            }
        }

        this.handleBreakRequest = this.handleBreakRequest.bind(this)
        this.handleResumeRequest = this.handleResumeRequest.bind(this)
        this.handleSettingsRequest = this.handleSettingsRequest.bind(this)
        this.handleSaveRequest = this.handleSaveRequest.bind(this)
        this.handleCloseRequest = this.handleCloseRequest.bind(this)
        this.handleAddExerciseRequest = this.handleAddExerciseRequest.bind(this)
        this.handleEditExerciseRequest = this.handleEditExerciseRequest.bind(this)
        this.handleCloseExercisesDialogRequest = this.handleCloseExercisesDialogRequest.bind(this)
        this.handleCloseEditExerciseDialogRequest = this.handleCloseEditExerciseDialogRequest.bind(this)
        this.handleCloseSettingsDialogRequest = this.handleCloseSettingsDialogRequest.bind(this)
    }

    formattedDurationToSeconds(str){
        const parts = str.split(":").map(s => parseInt(s))
        return parts[0] * 3600 + parts[1] * 60 + parts[2]
    }

    handleBreakRequest(){
        this.setState({ 
            isBreak: true,
            breakStartTime: this.state.duration
        })
    }

    handleResumeRequest(){
        this.setState({ 
            isBreak: false,
            breakStartTime: null 
        })
    }

    handleSaveRequest(){
    }

    handleSettingsRequest(){
        this.setState({
            isSettingsDialogOpen: true
        })
    }

    handleCloseSettingsDialogRequest(settings){
        let state = {
            isSettingsDialogOpen: false
        }

        if(settings){
            Object.assign(state, {
                settings: {
                    ...this.state.settings,
                    ...settings
                },
                maxBreakDurationSeconds: this.formattedDurationToSeconds(settings.maxBreakDuration)
            })
        }

        this.setState(state)
    }

    handleCloseRequest(){
        this.timerWorker.terminate()
        this.props.onCloseRequest && this.props.onCloseRequest()
    }

    handleAddExerciseRequest(){
        this.setState({ isExercisesDialogOpen: true })
    }

    handleCloseExercisesDialogRequest(value){
        if(value){
            this.setState({ 
                exercises: [ 
                    ...this.state.exercises, 
                    {
                        id: uuid(),
                        name: value,
                        sets: [],
                        weight: "",
                    }
                ]
            })
        }
        this.setState({ isExercisesDialogOpen: false })
    }

    handleEditExerciseRequest(exercise){
        this.setState({ 
            exerciseToEdit: exercise, 
            isEditExerciseDialogOpen: true 
        })
    }

    handleCloseEditExerciseDialogRequest(exercise){
        if(!exercise){
            this.setState({
                exerciseToEdit: null, 
                isEditExerciseDialogOpen: false 
            })
            return
        }
        const exercises = this.state.exercises.slice()
        Object.assign(exercises.find(e => e.id === exercise.id), exercise)
        this.setState({ 
            exercises,
            exerciseToEdit: null, 
            isEditExerciseDialogOpen: false 
        })
    }

    formattedDuration(duration){
        const timeParts = [
            Math.floor(duration / 3600), //hours
            Math.floor((duration / 60) % 60),  //minutes
            duration % 60               //seconds
        ]

        return timeParts
            .map(t => t.toString().padStart(2, '0'))
            .join(":")
    }

    render(){
        const {isBreak, breakStartTime, duration} = this.state

        return <React.Fragment>
            <AppBar isBreak={isBreak}>
                <AppBarSettingsButton onClick={this.handleSettingsRequest} icon="cog"></AppBarSettingsButton>
                <Stopwatch>{this.formattedDuration(isBreak? duration - breakStartTime : duration)}</Stopwatch>
                <AppBarCancelButton onClick={this.handleCloseRequest} icon="times"></AppBarCancelButton>
            </AppBar>
            <Container>
                <Exercises
                    exercises={this.state.exercises}
                    onExerciseClick={this.handleEditExerciseRequest}
                ></Exercises>
            </Container>
            {this.state.isSettingsDialogOpen && <WorkoutSettingsDialog
                settings={this.state.settings}
                open={this.state.isSettingsDialogOpen}
                onClose={this.handleCloseSettingsDialogRequest}
            ></WorkoutSettingsDialog>}
            {this.state.isEditExerciseDialogOpen && <EditExerciseDialog
                onClose={this.handleCloseEditExerciseDialogRequest}
                exercise={this.state.exerciseToEdit}
                open={this.state.isEditExerciseDialogOpen}
            ></EditExerciseDialog>}
            <ConfirmationDialog
                onClose={this.handleCloseExercisesDialogRequest}
                open={this.state.isExercisesDialogOpen}
                title="Exercises"
                values={Config.workout.exercises}
            ></ConfirmationDialog>
            <TabBar>
                <Tabs>
                    <Tab onClick={this.handleSaveRequest}>
                        <FontAwesomeIcon icon="check"></FontAwesomeIcon>
                    </Tab>
                    <Tab onClick={isBreak? this.handleResumeRequest : this.handleBreakRequest}>
                        <FontAwesomeIcon icon={isBreak? "play": "pause"}></FontAwesomeIcon>
                    </Tab>
                    <Tab onClick={this.handleAddExerciseRequest}>
                        <FontAwesomeIcon icon="plus"></FontAwesomeIcon>
                    </Tab>
                </Tabs>
            </TabBar>
        </React.Fragment>
    }
}