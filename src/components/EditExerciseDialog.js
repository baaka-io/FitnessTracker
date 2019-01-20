import React from "react"
import styled from "styled-components"
import {
    Dialog,
    DialogActions,
    Button,
    InputAdornment,
    DialogContent as _DialogContent,
    DialogTitle,
    Input,
} from "@material-ui/core"

const DialogContent = styled(_DialogContent)`
    padding: 20px !important;

    .weight-container{
        display: flex;
        align-items: center;

        span{
            margin-right: 10px;
        }
    }
`

export default class EditExerciseDialog extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            exercise: props.exercise
        }
        this.handleWeightChanged = this.handleWeightChanged.bind(this)
    }

    handleWeightChanged(event){
        this.setState({
            exercise: {
                ...this.state.exercise,
                weight: parseInt(event.target.value || 0)
            }
        })
    }

    render(){
        const { open, onClose } = this.props
        const exercise = this.state.exercise

        return <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            maxWidth="xs"
            open={open}
            onClose={onClose}
        >
            <DialogTitle>{exercise.name}</DialogTitle>
            <DialogContent>
                <div className="weight-container">
                    <span>Weight: </span>
                    <Input
                        onChange={this.handleWeightChanged}
                        endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
                        value={exercise.weight}
                        variant="outlined"
                    ></Input>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => onClose(null)} color="primary">
                    Cancel
                </Button>
                <Button onClick={() => onClose(exercise)} color="primary">
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    }
}