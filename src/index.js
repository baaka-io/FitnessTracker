import { LitElement, html } from "lit-element";
import Store from "./redux/store"
import { FIREBASE_INITIALIZE } from "./redux/actions";
import "client-link"
import "client-route"
import "./components/navbar/navbar"

class App extends LitElement{
    connectedCallback(){
        super.connectedCallback()
        Store.dispatch({ type: FIREBASE_INITIALIZE })
    }

    render(){
        return html`
            <ft-navbar></ft-navbar>
            <div class="container">
                <client-route path="/"> Home loaded </client-route>
                <client-route path="/Workouts"> Workouts loaded </client-route>
            </div>
        `
    }
}

customElements.define("fitness-tracker", App)