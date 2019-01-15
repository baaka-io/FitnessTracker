import { LitElement, html } from "lit-element";

class Navbar extends LitElement{
    render(){
        return html`
            <div class="navbar">
                <client-link to="/"> Home </client-link>
                <client-link to="/Workouts"> Workouts </client-link>
            </div>
        `
    }
}

customElements.define("ft-navbar", Navbar)