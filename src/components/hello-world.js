import { LitElement, html } from "lit-element";

class HelloWorld extends LitElement{
    render(){
        return html`
            <p> hello world </p>
        `
    }
}

customElements.define("hello-world", HelloWorld)