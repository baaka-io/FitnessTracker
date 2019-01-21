import React from "react"
import styled from "styled-components"
import {
    Dialog,
    InputAdornment,
    DialogContent as _DialogContent,
    DialogTitle,
    Input,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell
} from "@material-ui/core"
import { Tab, TabBar, Tabs } from "./TabBar";
import ContentEditable from "react-contenteditable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const DialogContent = styled(_DialogContent)`
    padding: 20px !important;
    display: flex;
    flex-direction: column;

    .weight-container{
        margin-top: auto;
        margin-bottom: 50px;
        display: flex;
        align-items: center;

        span{
            margin-right: auto;
        }
    }
`

const TableCellReps = styled.div`
    display: flex;
    align-items: center;

    div {
        flex-grow: 1;
        margin-right: 20px;
    }
`

export default class EditExerciseDialog extends React.Component{
    constructor(props){
        super(props)

        const exercise = props.exercise

        exercise.weight = exercise.weight.toString()

        this.state = {
            exercise
        }
        this.handleWeightChanged = this.handleWeightChanged.bind(this)
        this.handleCellChange = this.handleCellChange.bind(this)
        this.handleAddSetRequest = this.handleAddSetRequest.bind(this)
        this.handleDeleteSetRequest = this.handleDeleteSetRequest.bind(this)
    }

    handleWeightChanged(event){
        const weight = event.target.value
        const isFloatRegex = /^\d*.?\d*$/

        if(!isFloatRegex.test(weight)){
            return
        }

        console.log(weight)

        this.setState({
            exercise: {
                ...this.state.exercise,
                weight 
            }
        })
    }

    handleCellChange(event, setIndex){
        const sets = this.state.exercise.sets.slice()
        const value = parseInt(event.target.value)
        sets[setIndex] = Number.isNaN(value) ? 0 : value
        this.setState({
            exercise: {
                ...this.state.exercise,
                sets
            }
        })
    }

    handleAddSetRequest(){
        const sets = this.state.exercise.sets.slice()
        sets[sets.length] = 0
        this.setState({
            exercise: {
                ...this.state.exercise,
                sets
            }
        })
    }

    handleDeleteSetRequest(setIndex){
        const sets = this.state.exercise.sets.slice()
        sets.splice(setIndex, 1)
        this.setState({
            exercise: {
                ...this.state.exercise,
                sets
            }
        })
    }

    render(){
        const { open, onClose } = this.props
        const exercise = this.state.exercise

        return <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            fullScreen
            open={open}
            onClose={onClose}
        >
            <DialogTitle>{exercise.name}</DialogTitle>
            <DialogContent>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Set</TableCell>
                            <TableCell>Reps</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            exercise.sets.map((reps, i) => (
                                <TableRow key={i}>
                                    <TableCell>{i + 1}</TableCell>
                                    <TableCell>
                                        <TableCellReps>
                                            <ContentEditable
                                                html={reps.toString()}
                                                onChange={event => this.handleCellChange(event, i)}
                                            ></ContentEditable>
                                            <FontAwesomeIcon onClick={() => this.handleDeleteSetRequest(i)} icon="times"></FontAwesomeIcon>
                                        </TableCellReps>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
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
            <TabBar>
                <Tabs>
                    <Tab onClick={() => onClose({ ...exercise, weight: parseFloat(exercise.weight)})}>
                        <FontAwesomeIcon icon="check"></FontAwesomeIcon>
                    </Tab>
                    <Tab onClick={() => onClose(null)}>
                        <FontAwesomeIcon icon="arrow-down"></FontAwesomeIcon>
                    </Tab>
                    <Tab onClick={this.handleAddSetRequest}>
                        <FontAwesomeIcon icon="plus"></FontAwesomeIcon>
                    </Tab>
                </Tabs>
            </TabBar>
        </Dialog>
    }
}