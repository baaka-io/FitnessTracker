import React from "react"
import store from "../redux/store"
import firebase from "firebase"
import { WORKOUT_SET } from "../redux/actions"
import { avatars } from "./Exercises"
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Dialog
} from "@material-ui/core"
import withAuthGuard from "../withAuthGuard"
import Config from "../../config.toml"
import Workout from "./Workout"

class Workouts extends React.Component {
  constructor() {
    super()

    const state = store.getState()
    let _workouts = state && state.workouts

    if (!_workouts) _workouts = []

    this.state = {
      workouts: _workouts,
      selectedWorkout: null,
      exerciseToEdit: null,
      isWorkoutOpen: false,
      isWorkoutSettingsOpen: false,
      isWorkoutEditExerciseOpen: false
    }

    store.subscribe(() => {
      const workouts = store.getState().workouts || []
      if (workouts.length != this.state.workouts.length) {
        this.setState({
          workouts
        })
      }
    })

    this.getWorkedMuscleImages = this.getWorkedMuscleImages.bind(this)
    this.handleWorkoutSelection = this.handleWorkoutSelection.bind(this)
    this.handleCloseWorkoutRequest = this.handleCloseWorkoutRequest.bind(this)
    this.handleSettingsRequest = this.handleSettingsRequest.bind(this)
    this.handleCloseSettingsRequest = this.handleCloseSettingsRequest.bind(this)
    this.handleWorkoutEditExerciseRequest = this.handleWorkoutEditExerciseRequest.bind(
      this
    )
    this.handleCloseWorkoutEditExerciseRequest = this.handleCloseWorkoutEditExerciseRequest.bind(
      this
    )
  }

  componentWillMount() {
    const state = store.getState()
    if (state.isFirebaseInitialized && state.currentUser) {
      firebase
        .database()
        .ref("workouts")
        .orderByChild("userId")
        .equalTo(store.getState().currentUser.uid)
        .once("value", snapshot => {
          const val = snapshot.val()
          store.dispatch({
            type: WORKOUT_SET,
            payload: val ? Object.values(val) : []
          })
        })
    }
  }

  getWorkedMuscleImages(w) {
    return Array.from(
      new Set(w.exercises.map(e => avatars[Config.workout.exercises[e.name]]))
    )
  }

  handleWorkoutSelection(w) {
    this.setState({
      isWorkoutOpen: true,
      selectedWorkout: w
    })
  }

  handleCloseWorkoutRequest() {
    this.setState({
      isWorkoutOpen: false
    })
  }

  handleSettingsRequest() {
    this.setState({
      isWorkoutSettingsOpen: true
    })
  }

  handleCloseSettingsRequest() {
    this.setState({
      isWorkoutSettingsOpen: false
    })
  }

  handleCloseWorkoutEditExerciseRequest() {
    this.setState({
      isWorkoutEditExerciseOpen: false
    })
  }

  handleWorkoutEditExerciseRequest(exercise) {
    this.setState({
      isWorkoutEditExerciseOpen: true,
      exerciseToEdit: exercise
    })
  }

  formattedDuration(duration) {
    const timeParts = [
      Math.floor(duration / 3600), //hours
      Math.floor((duration / 60) % 60), //minutes
      duration % 60 //seconds
    ]

    return timeParts.map(t => t.toString().padStart(2, "0")).join(":")
  }

  render() {
    return (
      <React.Fragment>
        {this.state.isWorkoutOpen && (
          <Dialog fullScreen open={this.state.isWorkoutOpen}>
            <Workout
              editable={false}
              time={this.formattedDuration(this.state.selectedWorkout.duration)}
              settings={this.state.selectedWorkout.settings}
              isExercisesDialogOpen={false}
              isSettingsDialogOpen={this.state.isWorkoutSettingsOpen}
              isEditExerciseDialogOpen={this.state.isWorkoutEditExerciseOpen}
              exerciseToEdit={this.state.exerciseToEdit}
              onSettingsRequest={this.handleSettingsRequest}
              onCloseSettingsDialogRequest={this.handleCloseSettingsRequest}
              onEditExerciseRequest={this.handleWorkoutEditExerciseRequest}
              onCloseEditExerciseDialogRequest={
                this.handleCloseWorkoutEditExerciseRequest
              }
              onCloseRequest={this.handleCloseWorkoutRequest}
              exercises={this.state.selectedWorkout.exercises}
            />
          </Dialog>
        )}
        <List>
          {this.state.workouts.map((w, i) => {
            const date = new Date(w.date)
            return (
              <ListItem key={i} onClick={() => this.handleWorkoutSelection(w)}>
                <ListItemText>
                  {date.getDate()}.{date.getMonth() + 1}.{date.getFullYear()}
                </ListItemText>
                {this.getWorkedMuscleImages(w).map((src, i) => (
                  <React.Fragment key={i}>
                    <ListItemIcon>
                      <img height={48} width={48} src={src} />
                    </ListItemIcon>
                  </React.Fragment>
                ))}
              </ListItem>
            )
          })}
        </List>
      </React.Fragment>
    )
  }
}

export default withAuthGuard(Workouts)
