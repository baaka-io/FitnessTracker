import React from "react"
import ReactDOM from "react-dom"
import { library } from "@fortawesome/fontawesome-svg-core";
import * as Icons from "@fortawesome/free-solid-svg-icons";
import App from "./app"
import { BrowserRouter as Router } from "react-router-dom"

library.add(
    Icons.faUser,
    Icons.faHome,
    Icons.faDumbbell,
    Icons.faPause,
    Icons.faPlus,
    Icons.faCheck,
    Icons.faTimes,
    Icons.faPlay,
    Icons.faCog,
    Icons.faArrowDown
)

ReactDOM.render(<Router><App/></Router>, document.getElementById("root"))