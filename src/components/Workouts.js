import React from "react"
import store from "../redux/store"

export default class Workouts extends React.Component{
    constructor(){
        super()

        this.state = {
            workouts: store.getState()? store.getState().workouts : []
        }

        store.subscribe(() => {
            const workouts = store.getState().workouts || [];

            if(workouts.length != this.state.workouts.length){
                this.setState({
                    workouts
                })
            }
        })
    }
    render(){
        return this.state.workouts.map((w, i) => (
            <p key={i}>{w.date.getDate()}.{w.date.getMonth() + 1}.{w.date.getFullYear()}</p>
        ))
    }
}