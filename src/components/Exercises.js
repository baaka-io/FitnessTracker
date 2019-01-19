import React from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ExerciseList = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0 10px;
`
const ExercisesTitle = styled.span`
    margin-top: 20px;
    display: flex;
    align-items: center;
    margin-bottom: 15px;
`
const ExercisesTitleText = styled.span`
    margin-right: auto;
    font-size: 1.5em;
`
const Exercise = styled.li`
    display: flex;
`
const ExerciseName = styled.span`
    font-size: 1.2em;
    margin-right: auto;
`
const ExerciseSetsOverview = styled.span`
    margin-left: auto;
`

export default class Exercises extends React.Component{
    setsOverview(e){
        const sum = e.sets.reduce((previous, current) => current += previous)
        const avg = sum / e.sets.length

        return `${e.sets.length}/${avg}`
    }
    render(){
        return <React.Fragment>
            <ExercisesTitle>
                <ExercisesTitleText>Exercises</ExercisesTitleText>
                <FontAwesomeIcon icon="plus"></FontAwesomeIcon>
            </ExercisesTitle>
            <ExerciseList>
                {
                    this.props.exercises.map((e, i) => (
                        <Exercise key={i}>
                            <ExerciseName>{e.name}</ExerciseName>
                            <ExerciseSetsOverview>{this.setsOverview(e)}</ExerciseSetsOverview>
                        </Exercise>
                    ))
                }
            </ExerciseList>
        </React.Fragment>
    }
}