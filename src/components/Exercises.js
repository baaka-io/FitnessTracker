import React from "react"
import styled from "styled-components"
import ChestImage  from "../../assets/chest.png"
import BicepsImage  from "../../assets/biceps.png"
import ShouldersImage  from "../../assets/shoulders.png"
import TricepsImage  from "../../assets/triceps.png"
import LegsImage  from "../../assets/legs.png"
import BackImage  from "../../assets/back.png"
import { List, ListItem, Avatar, ListItemText, Divider } from "@material-ui/core";

const ExercisesTitle = styled.span`
    margin-bottom: 15px;
    margin-right: auto;
    font-size: 1.5em;
`

const ExercisesList = styled(List)`
    max-height: 85%;
    overflow-y: scroll;
`

const AvatarImage = styled.img`
    max-width: 64px;
    max-height: 64px;
`

const exercise_avatar = {
    "Bench Press": ChestImage,
    "Biceps Curls": BicepsImage,
    "Chest Flys": ChestImage,
    "Concentration Curls": BicepsImage,
    "Incline Bench Press": ChestImage,
    "Incline Biceps Curls": BicepsImage,
    "Sitting Shoulder Press": ShouldersImage,
    "Skull Crushers": TricepsImage,
    "Standing Shoulder Press": ShouldersImage,
    "Triceps Extensions": TricepsImage,
    "Squats": LegsImage,
    "Deadlift": BackImage
}

export default class Exercises extends React.Component{
    setsOverview(e){
        const sum = e.sets.reduce((previous, current) => current += previous)
        const avg = sum / e.sets.length

        return `${e.sets.length} x ${avg}`
    }
    render(){
        return <React.Fragment>
            <ExercisesTitle>Exercises</ExercisesTitle>
            <ExercisesList>
                {this.props.exercises.length != 0 && <Divider></Divider>}
                {
                    this.props.exercises.map((e, i) => (
                        <div key={i}>
                            <ListItem onClick={() => this.props.onExerciseClick(e)}>
                                <Avatar>
                                    <AvatarImage src={exercise_avatar[e.name]}></AvatarImage>
                                </Avatar>
                                <ListItemText primary={e.name} secondary={this.setsOverview(e)}/>
                                <span>{e.weight + " kg"} </span>
                            </ListItem>
                            <Divider></Divider>
                        </div>
                    ))
                }
            </ExercisesList>
        </React.Fragment>
    }
}