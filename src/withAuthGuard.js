import React from "react"
import store from "./redux/store"
import { Redirect } from "react-router-dom"

export default (Component) => props => {
    const state = store.getState()

    if(!state || !state.currentUser)
        return <Redirect to="/user"></Redirect>

    return <Component {...props}></Component>
}