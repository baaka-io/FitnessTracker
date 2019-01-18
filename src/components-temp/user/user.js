import { LitElement, html } from "lit-element";
import Store from "../../redux/store"
import css from "./user.scss"
import { AUTH_SIGN_IN, AUTH_SIGN_OUT } from "../../redux/actions";

class FtUser extends LitElement{

    static get properties(){
        return {
            currentUser: {
                type: Object
            }
        }
    }

    connectedCallback(){
        super.connectedCallback()
        this.currentUser = Store.getState() && Store.getState().currentUser

        Store.subscribe(() => {
            const state = Store.getState()

            this.currentUser = state && state.currentUser
        })
    }

    signIn(){
        Store.dispatch({ type: AUTH_SIGN_IN })
    }

    signOut(){
        Store.dispatch({ type: AUTH_SIGN_OUT })
    }

    render(){ 
        const signedOutView = html`
            <div class="signed-out">
                <h1> Sign In </h1>
                <button @click=${this.signIn}> Sign in with Google</button>
            </div>
        `

        const signedInView = this.currentUser && html`
            <div class="signed-in">
                <img src="${this.currentUser.photoURL}"/>
                <span>${this.currentUser.displayName}</span>
                <span>${this.currentUser.email}</span>
                <button @click=${this.signOut}> Sign Out </button>
            </div>
        `

        return html`
            <style>${css}</style>
            <div class="container">
                ${this.currentUser
                    ? signedInView
                    : signedOutView}
            </div>
        `
    }
}

customElements.define("ft-user", FtUser)