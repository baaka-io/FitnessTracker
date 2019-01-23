import * as Redux from "redux"
import rootReducer from "./reducers"

const initialState = {
    currentUser: null,
    isFirebaseInitialized: false,
    workouts: []
}

const store = Redux.createStore(
    rootReducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store