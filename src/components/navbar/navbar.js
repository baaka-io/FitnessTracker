import { LitElement, html } from "lit-element";
import css from "./navbar.scss"

class Navbar extends LitElement{
    render(){
        return html`
            <style>
                ${css}
            </style>
            <div class="navbar">
                <client-link to="/">
                    <iron-icon class="active" icon="vaadin:home"></iron-icon>
                    <iron-icon class="not-active" icon="vaadin:home-o"></iron-icon>
                </client-link>
                <client-link to="/workouts">
                    <iron-icon class="active" icon="vaadin:table"></iron-icon>
                    <iron-icon class="not-active" icon="vaadin:table"></iron-icon>
                </client-link>
                <client-link to="/user"> 
                    <iron-icon class="active" icon="social:person"></iron-icon>
                    <iron-icon class="not-active" icon="social:person-outline"></iron-icon>
                </client-link>
            </div>
        `
    }
}

customElements.define("ft-navbar", Navbar)