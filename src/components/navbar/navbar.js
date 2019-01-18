import { LitElement, html } from "lit-element";
import css from "./navbar.scss"

class Navbar extends LitElement{
    render(){
        return html`
            <style>${css}</style>
            <div class="navbar">
                <client-link to="/">
                    <iron-icon icon="icons:home"></iron-icon>
                </client-link>
                <client-link to="/Workouts"> 
                    <iron-icon icon="places:fitness-center"></iron-icon>
                </client-link>
            </div>
        `
    }
}

customElements.define("ft-navbar", Navbar)