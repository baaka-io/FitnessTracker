import Redux from "redux"
import rootReducer from "./reducers"

const store = Redux.createStore(
    rootReducer
)

export const store