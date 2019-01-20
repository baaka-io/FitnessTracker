import React from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Timer from "tiny-timer";
import Exercises from "./Exercises"
import Config from "../../config.toml"
import ConfirmationDialog from "./ConfirmationDialog"
import { v4 as uuid } from "uuid";
import EditExerciseDialog from "./EditExerciseDialog"
import {
    TabBar,
    Tabs,
    Tab
} from "./TabBar"
import { faUserInjured } from "@fortawesome/free-solid-svg-icons";

const AppBar = styled.div`
    color: white;
    background-color: #333333;
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
            exercises: [
                {
                    id: uuid(),
                    name: "Chest Flys",
                    sets: [8,8,8],
                    weight: 40,
                },
                {
                    id: uuid(),
                    name: "Biceps Curls",
                    sets: [8,8,8],
                    weight: 20,
                },
            ],
            breaks: [
                120,
                120
            ],
            exerciseToEdit: {},
            isExercisesDialogOpen: false,
            isEditExerciseDialogOpen: false,
        }

        this.handleBreakRequest = this.handleBreakRequest.bind(this)
        this.handleSaveRequest = this.handleSaveRequest.bind(this)
        this.handleCloseRequest = this.handleCloseRequest.bind(this)
        this.handleAddExerciseRequest = this.handleAddExerciseRequest.bind(this)
        this.handleCloseExercisesDialogRequest = this.handleCloseExercisesDialogRequest.bind(this)
        this.handleEditExerciseRequest = this.handleEditExerciseRequest.bind(this)
        this.handleCloseEditExerciseDialogRequest = this.handleCloseEditExerciseDialogRequest.bind(this)
    }

    componentDidMount(){
        this.timer = new Timer({ stopwatch: true })
        this.timer.on("tick", ms => {
            this.setState({ ...this.state, duration: Math.round(ms/1000) })
        })
        this.timer.start(60 * 60 * 1000)
    }

    handleBreakRequest(){
    }

    handleSaveRequest(){
    }

    handleCloseRequest(){
        this.timer.stop()
        this.timer = null
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
                        sets: [8,8,8],
                        weight: 20,
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
        const exercises = this.state.exercises.slice()
        Object.assign(exercises.find(e => e.id === exercise.id), exercise)
        this.setState({ 
            exercises,
            exerciseToEdit: null, 
            isEditExerciseDialogOpen: false 
        })
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
                <Stopwatch>{this.formattedDuration()}</Stopwatch>
                <AppBarCancelButton onClick={this.handleCloseRequest} icon="times"></AppBarCancelButton>
            </AppBar>
            <Container>
                <Exercises
                    exercises={this.state.exercises}
                    onExerciseClick={this.handleEditExerciseRequest}
                ></Exercises>
            </Container>
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
                    <Tab onClick={this.handleBreakRequest}>
                        <FontAwesomeIcon icon="pause"></FontAwesomeIcon>
                    </Tab>
                    <Tab onClick={this.handleAddExerciseRequest}>
                        <FontAwesomeIcon icon="plus"></FontAwesomeIcon>
                    </Tab>
                </Tabs>
            </TabBar>
        </React.Fragment>
    }
}