import React from "react"
import store from "../redux/store"
import firebase from "firebase"
import { WORKOUT_SET } from "../redux/actions"
import withAuthGuard from "../withAuthGuard"

class Workouts extends React.Component{
    constructor(){
        super()

        const state = store.getState()
        let _workouts = state && state.workouts

        if(!_workouts)
            _workouts = []

        this.state = {
            workouts: _workouts
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

    componentWillMount(){
        const unsubscribe = store.subscribe(() => {
            const state = store.getState()
            if(state.isFirebaseInitialized && state.currentUser){
                firebase
                    .database()
                    .ref("workouts")
                    .orderByChild("userId")
                    .equalTo(store.getState().currentUser.uid)
                    .once("value", snapshot => {
                        const val = snapshot.val()
                        store.dispatch({ type: WORKOUT_SET, payload: val? Object.values(val) : []})
                    })
                unsubscribe()
            }
        })
    }


    render(){
        return this.state.workouts.map((w, i) => (
            <p key={i}>{w.date}</p>
        ))
    }
}

export default withAuthGuard(Workouts)