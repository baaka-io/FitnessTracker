import { LitElement, html } from "lit-element";
import css from "./home.scss"

class FtHome extends LitElement{
    render(){ 
        return html`
            <style>${css}</style>
            <div class="container">
                <div class="call-to-action">
                    <button> WORK OUT! </button>
                </div>
            </div>
        `
    }
}

customElements.define("ft-home", FtHome)