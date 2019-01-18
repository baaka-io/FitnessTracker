import { LitElement, html } from "lit-element";
import Store from "./redux/store"
import { FIREBASE_INITIALIZE } from "./redux/actions";
import "@polymer/iron-icon/iron-icon"
import "@polymer/iron-icons/iron-icons"
import "@polymer/iron-icons/places-icons"
import "client-link"
import "client-route"
import "./components/workouts/workouts"
import "./components/navbar/navbar"
import "./components/home/home"

class App extends LitElement{
    connectedCallback(){
        super.connectedCallback()
        Store.dispatch({ type: FIREBASE_INITIALIZE })
    }

    render(){
        return html`
            <ft-navbar></ft-navbar>
            <div class="container">
                <client-route path="/"> <ft-home></ft-home> </client-route>
                <client-route path="/Workouts"> <ft-workouts></ft-workouts> </client-route>
            </div>
        `
    }
}

customElements.define("fitness-tracker", App)