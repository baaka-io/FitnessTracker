import { LitElement, html } from "lit-element";
import Firebase from "firebase";
import config from "../config.toml"

class App extends LitElement{
    async connectedCallback(){
        super.connectedCallback()
        this.currentUser = null
        Firebase.initializeApp(config.firebase)
        await Firebase.auth().setPersistence(Firebase.auth.Auth.Persistence.LOCAL)
        Firebase.auth().onAuthStateChanged(x => {
            this.currentUser = x;
            this.performUpdate()
        })
    }

    login(){
        const provider = new Firebase.auth.GoogleAuthProvider()
        provider.addScope("https://www.googleapis.com/auth/drive")
        provider.setCustomParameters({
            prompt: 'select_account'
        })

        Firebase
            .auth()
            .signInWithRedirect(provider)
    }

    logout(){
        Firebase
            .auth()
            .signOut()
            .then(res => {
                this.performUpdate()
            })
    }

    render(){
        return html`
            <button @click=${this.login}>sign in</button>
            <button @click=${this.logout}>sign out</button>
            ${
                this.currentUser
                ? html`
                    <p>${this.currentUser.displayName}</p>
                    <img src="${this.currentUser.photoURL}"></img>
                `
                : ''
            }
        `
    }
}

customElements.define("fitness-tracker", App)