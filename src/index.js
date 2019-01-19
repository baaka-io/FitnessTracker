import React from "react"
import ReactDOM from "react-dom"
import { library } from "@fortawesome/fontawesome-svg-core";
import * as Icons from "@fortawesome/free-solid-svg-icons";
import App from "./app"

library.add(
    Icons.faUser,
    Icons.faHome,
    Icons.faDumbbell,
    Icons.faTimes,
    Icons.faPause,
    Icons.faPlus
)

ReactDOM.render(<App/>, document.getElementById("root"))