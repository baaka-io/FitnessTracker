import { LitElement, html } from "lit-element";


class FtWorkouts extends LitElement{
    render(){ 
        return html`
            <p>workouts</p>
        `
    }
}

customElements.define("ft-workouts", FtWorkouts)