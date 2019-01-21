import React from "react"
import ReactDOM from "react-dom"
import { library } from "@fortawesome/fontawesome-svg-core";
import * as Icons from "@fortawesome/free-solid-svg-icons";
import App from "./app"

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

Object.compare = function (obj1, obj2) {
	//Loop through properties in object 1
	for (var p in obj1) {
		//Check property exists on both objects
		if (obj1.hasOwnProperty(p) !== obj2.hasOwnProperty(p)) return false;
 
		switch (typeof (obj1[p])) {
			//Deep compare objects
			case 'object':
				if (!Object.compare(obj1[p], obj2[p])) return false;
				break;
			//Compare function code
			case 'function':
				if (typeof (obj2[p]) == 'undefined' || (p != 'compare' && obj1[p].toString() != obj2[p].toString())) return false;
				break;
			//Compare values
			default:
				if (obj1[p] != obj2[p]) return false;
		}
	}
 
	//Check object 2 for any extra properties
	for (var p in obj2) {
		if (typeof (obj1[p]) == 'undefined') return false;
	}
	return true;
};

ReactDOM.render(<App/>, document.getElementById("root"))