import React from "react"
import styled from "styled-components"
import { Dialog, Slide } from "@material-ui/core"
import BackgroundImage from "../../assets/home-background.jpg"
import EditableWorkout from "./EditableWorkout"

const Container = styled.div`
  height: 100%;
  background-image: url(${BackgroundImage});
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
`
const CallToAction = styled.button`
  border: 1px solid white;
  background: rgba(0, 0, 0, 0.2);
  padding: 10px 20px;
  font-size: 1.5em;
  color: white;

  &:hover {
    background: rgba(0, 0, 0, 0.4);
  }
`

const dialogTransition = props => <Slide direction="up" {...props} />

class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      isWorkoutDialogOpen: false
    }
  }

  handleWorkOutRequest() {
    this.setState({ ...this.state, isWorkoutDialogOpen: true })
  }

  handleCloseRequest() {
    this.setState({ ...this.state, isWorkoutDialogOpen: false })
  }

  render() {
    return (
      <Container>
        <CallToAction onClick={this.handleWorkOutRequest.bind(this)}>
          WORK OUT
        </CallToAction>
        <Dialog
          fullScreen
          open={this.state.isWorkoutDialogOpen}
          onClose={this.handleCloseRequest.bind(this)}
          TransitionComponent={dialogTransition}
        >
          <EditableWorkout
            onCloseRequest={this.handleCloseRequest.bind(this)}
          />
        </Dialog>
      </Container>
    )
  }
}

export default Home
