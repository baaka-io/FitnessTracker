import React from "react"
import { v4 as uuid } from "uuid"
import firebase from "firebase"
import TimerWorker from "../timer.worker"
import store from "../redux/store"
import withAuthGuard from "../withAuthGuard"
import { WORKOUT_ADD } from "../redux/actions"
import Workout from "./Workout"

class EditableWorkout extends React.Component {
  constructor() {
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

    if (firebase.messaging.isSupported()) {
      const messaging = firebase.messaging()

      messaging
        .requestPermission()
        .then(() => messaging.getToken())
        .then(token => {
          this.token = token
        })

      firebase.messaging().onMessage(message => {
        console.log(message)
      })
    }

    this.updateTimeWorker()

    this.timerWorker.onmessage = message => {
      const time = message.data
      this.setState({ ...this.state, duration: Math.round(time / 1000) })
    }

    this.handleBreakRequest = this.handleBreakRequest.bind(this)
    this.handleResumeRequest = this.handleResumeRequest.bind(this)
    this.handleSettingsRequest = this.handleSettingsRequest.bind(this)
    this.handleSaveRequest = this.handleSaveRequest.bind(this)
    this.handleCloseRequest = this.handleCloseRequest.bind(this)
    this.handleAddExerciseRequest = this.handleAddExerciseRequest.bind(this)
    this.handleEditExerciseRequest = this.handleEditExerciseRequest.bind(this)
    this.handleCloseExercisesDialogRequest = this.handleCloseExercisesDialogRequest.bind(
      this
    )
    this.handleCloseEditExerciseDialogRequest = this.handleCloseEditExerciseDialogRequest.bind(
      this
    )
    this.handleCloseSettingsDialogRequest = this.handleCloseSettingsDialogRequest.bind(
      this
    )
  }

  componentWillUnmount() {
    this.timerWorker.onmessage = () => {}
  }

  updateTimeWorker() {
    this.timerWorker.postMessage([
      this.state.isBreak,
      this.state.maxBreakDurationSeconds,
      this.state.breakStartTime
    ])
  }

  formattedDurationToSeconds(str) {
    const parts = str.split(":").map(s => parseInt(s))
    return parts[0] * 3600 + parts[1] * 60 + parts[2]
  }

  handleBreakRequest() {
    this.setState(
      {
        isBreak: true,
        breakStartTime: this.state.duration
      },
      () => this.updateTimeWorker()
    )
  }

  handleResumeRequest() {
    this.setState({
      isBreak: false,
      breakStartTime: null
    })
  }

  handleSaveRequest() {
    this.timerWorker.terminate()
    store.dispatch({
      type: WORKOUT_ADD,
      payload: Object.assign(
        {},
        {
          id: uuid(),
          duration: this.state.duration,
          exercises: this.state.exercises,
          settings: this.state.settings,
          date: Date.now()
        }
      )
    })
    this.props.onCloseRequest && this.props.onCloseRequest()
  }

  handleSettingsRequest() {
    this.setState({
      isSettingsDialogOpen: true
    })
  }

  handleCloseSettingsDialogRequest(settings) {
    let state = {
      isSettingsDialogOpen: false
    }

    if (settings) {
      Object.assign(state, {
        settings: {
          ...this.state.settings,
          ...settings
        },
        maxBreakDurationSeconds: this.formattedDurationToSeconds(
          settings.maxBreakDuration
        )
      })
    }

    this.setState(state, () => this.updateTimeWorker())
  }

  handleCloseRequest() {
    this.timerWorker.terminate()
    this.props.onCloseRequest && this.props.onCloseRequest()
  }

  handleAddExerciseRequest() {
    this.setState({ isExercisesDialogOpen: true })
  }

  handleCloseExercisesDialogRequest(value) {
    if (value) {
      this.setState({
        exercises: [
          ...this.state.exercises,
          {
            id: uuid(),
            name: value,
            sets: [],
            weight: ""
          }
        ]
      })
    }
    this.setState({ isExercisesDialogOpen: false })
  }

  handleEditExerciseRequest(exercise) {
    this.setState({
      exerciseToEdit: exercise,
      isEditExerciseDialogOpen: true
    })
  }

  handleCloseEditExerciseDialogRequest(exercise) {
    if (!exercise) {
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

  formattedDuration(duration) {
    const timeParts = [
      Math.floor(duration / 3600), //hours
      Math.floor((duration / 60) % 60), //minutes
      duration % 60 //seconds
    ]

    return timeParts.map(t => t.toString().padStart(2, "0")).join(":")
  }

  render() {
    const { isBreak, breakStartTime, duration } = this.state

    return (
      <Workout
        time={this.formattedDuration(
          isBreak ? duration - breakStartTime : duration
        )}
        editable={true}
        exercises={this.state.exercises}
        exerciseToEdit={this.state.exerciseToEdit}
        settings={this.state.settings}
        isBreak={isBreak}
        isSettingsDialogOpen={this.state.isSettingsDialogOpen}
        isEditExerciseDialogOpen={this.state.isEditExerciseDialogOpen}
        isExercisesDialogOpen={this.state.isExercisesDialogOpen}
        onSettingsRequest={this.handleSettingsRequest}
        onCloseRequest={this.handleCloseRequest}
        onEditExerciseRequest={this.handleEditExerciseRequest}
        onCloseSettingsDialogRequest={this.handleCloseSettingsDialogRequest}
        onCloseEditExerciseDialogRequest={
          this.handleCloseEditExerciseDialogRequest
        }
        onCloseExercisesDialogRequest={this.handleCloseExercisesDialogRequest}
        onSaveRequest={this.handleSaveRequest}
        onResumeRequest={this.handleResumeRequest}
        onBreakRequest={this.handleBreakRequest}
        onAddExerciseRequest={this.handleAddExerciseRequest}
      />
    )
  }
}

export default withAuthGuard(EditableWorkout)
