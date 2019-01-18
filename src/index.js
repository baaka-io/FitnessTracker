import { LitElement, html } from "lit-element";
import Store from "./redux/store"
import { FIREBASE_INITIALIZE } from "./redux/actions";
import "@polymer/iron-icon/iron-icon"
import "@polymer/iron-icons/iron-icons"
import "@polymer/iron-icons/places-icons"
import "@polymer/iron-icons/social-icons"
import '@vaadin/vaadin-icons/vaadin-icons.js'
import "client-link"
import "client-route"
import "./components/user/user"
import "./components/navbar/navbar"
import "./components/home/home"

class App extends LitElement{
    connectedCallback(){
        super.connectedCallback()
        Store.dispatch({ type: FIREBASE_INITIALIZE })
    }

    render(){
        return html`
            <style>
                .container {
                    height: calc(100vh - 40px);
                }
            </style>
            <div class="container">
                <client-route path="/"> <ft-home></ft-home> </client-route>
                <client-route path="/user"> <ft-user></ft-user> </client-route>
            </div>
            <ft-navbar></ft-navbar>
        `
    }
}

customElements.define("fitness-tracker", App)