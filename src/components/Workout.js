import React from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Exercises from "./Exercises"
import Config from "../../config.toml"
import ConfirmationDialog from "./ConfirmationDialog"
import { v4 as uuid } from "uuid"
import EditExerciseDialog from "./EditExerciseDialog"
import firebase from "firebase"
import WorkoutSettingsDialog from "./WorkoutSettingsDialog"
import TimerWorker from "../timer.worker"
import { TabBar, Tabs, Tab } from "./TabBar"
import store from "../redux/store"
import withAuthGuard from "../withAuthGuard"
import { WORKOUT_ADD } from "../redux/actions"

const AppBar = styled.div`
  color: white;
  background-color: ${({ isBreak }) => (isBreak ? "#db3920" : "#333333")};
  height: 50px;
  display: flex;
  align-items: center;
  position: relative;
  padding: 0 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
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

const Workout = props => {
  return (
    <React.Fragment>
      <AppBar isBreak={props.isBreak}>
        <AppBarSettingsButton onClick={props.onSettingsRequest} icon="cog" />
        <Stopwatch>{props.time}</Stopwatch>
        <AppBarCancelButton onClick={props.onCloseRequest} icon="times" />
      </AppBar>
      <Container>
        <Exercises
          exercises={props.exercises}
          onExerciseClick={props.onEditExerciseRequest}
        />
      </Container>
      {props.isSettingsDialogOpen && (
        <WorkoutSettingsDialog
          editable={props.editable}
          settings={props.settings}
          open={props.isSettingsDialogOpen}
          onClose={props.onCloseSettingsDialogRequest}
        />
      )}
      {props.isEditExerciseDialogOpen && (
        <EditExerciseDialog
          editable={props.editable}
          onClose={props.onCloseEditExerciseDialogRequest}
          exercise={props.exerciseToEdit}
          open={props.isEditExerciseDialogOpen}
        />
      )}
      <ConfirmationDialog
        onClose={props.onCloseExercisesDialogRequest}
        open={props.isExercisesDialogOpen}
        title="Exercises"
        values={Object.keys(Config.workout.exercises)}
      />
      {props.editable && (
        <TabBar>
          <Tabs>
            <Tab onClick={props.onSaveRequest}>
              <FontAwesomeIcon icon="check" />
            </Tab>
            <Tab
              onClick={
                props.isBreak ? props.onResumeRequest : props.onBreakRequest
              }
            >
              <FontAwesomeIcon icon={props.isBreak ? "play" : "pause"} />
            </Tab>
            <Tab onClick={props.onAddExerciseRequest}>
              <FontAwesomeIcon icon="plus" />
            </Tab>
          </Tabs>
        </TabBar>
      )}
    </React.Fragment>
  )
}

export default withAuthGuard(Workout)
