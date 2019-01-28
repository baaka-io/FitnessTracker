import React from "react"
import styled from "styled-components"
import ChestImage from "../../assets/chest.png"
import BicepsImage from "../../assets/biceps.png"
import ShouldersImage from "../../assets/shoulders.png"
import TricepsImage from "../../assets/triceps.png"
import LegsImage from "../../assets/legs.png"
import BackImage from "../../assets/back.png"
import Config from "../../config.toml"
import {
  List,
  ListItem,
  Avatar,
  ListItemText,
  Divider
} from "@material-ui/core"

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

export const avatars = {
  CHEST_IMAGE: ChestImage,
  BICEPS_IMAGE: BicepsImage,
  SHOULDERS_IMAGE: ShouldersImage,
  TRICEPS_IMAGE: TricepsImage,
  LEGS_IMAGE: LegsImage,
  BACK_IMAGE: BackImage
}

export default class Exercises extends React.Component {
  setsOverview(e) {
    if (!e.sets.length) return ""

    const sum = e.sets.reduce((previous, current) => (current += previous))
    const avg = sum / e.sets.length

    return `${e.sets.length} x ${avg.toFixed(1)}`
  }
  render() {
    return (
      <React.Fragment>
        <ExercisesTitle>Exercises</ExercisesTitle>
        <ExercisesList>
          {this.props.exercises.length != 0 && <Divider />}
          {this.props.exercises.map((e, i) => (
            <div key={i}>
              <ListItem onClick={() => this.props.onExerciseClick(e)}>
                <Avatar>
                  <AvatarImage
                    src={avatars[Config.workout.exercises[e.name]]}
                  />
                </Avatar>
                <ListItemText
                  primary={e.name}
                  secondary={this.setsOverview(e)}
                />
                <span>{e.weight + " kg"} </span>
              </ListItem>
              <Divider />
            </div>
          ))}
        </ExercisesList>
      </React.Fragment>
    )
  }
}
