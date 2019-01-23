import { 
    AUTH_SIGN_IN, 
    AUTH_SIGN_OUT, 
    AUTH_CHANGE_USER,
    WORKOUT_ADD,
    WORKOUT_SET,
    FIREBASE_INITIALIZE
} from "./actions";
import Firebase from "firebase"
import config from "../../config.toml"
import Store from "./store"

let db = null

export default function rootReducer(state, action){
    action.payload = action.payload || {}
    switch (action.type) {
        case WORKOUT_ADD:
            db.ref("workouts").push({ 
                ...action.payload,
                userId: state.currentUser.uid
            })
            return { 
                ...state, 
                workouts: [
                    ...(state.workouts || []),
                    action.payload 
                ]
            }
        case WORKOUT_SET:
            return {
                ...state,
                workouts: action.payload
            }
        case FIREBASE_INITIALIZE:
            if(action.payload._success === undefined){
                Firebase.initializeApp(config.firebase)
                Firebase
                    .auth()
                    .setPersistence(Firebase.auth.Auth.Persistence.LOCAL)
                    .then(res => {
                        db = Firebase.database()
                        Store.dispatch({
                            type: FIREBASE_INITIALIZE,
                            payload: {
                                _success: true,
                                response: res
                            }
                        })
                    })
                    .catch(err => {
                        Store.dispatch({
                            type: FIREBASE_INITIALIZE,
                            payload: {
                                _success: false,
                                error: err
                            }
                        })
                    })
                return state
            }
            else {
                Firebase.auth().onAuthStateChanged(x => {
                    Store.dispatch({
                        type: AUTH_CHANGE_USER,
                        payload: {
                            user: x
                        }
                    })
                })

                return {
                    ...state,
                    isFirebaseInitialized: true
                }
            }
        case AUTH_SIGN_IN:
            const provider = new Firebase.auth.GoogleAuthProvider()
            provider.addScope("https://www.googleapis.com/auth/drive")
            provider.setCustomParameters({
                prompt: 'select_account'
            })

            Firebase
                .auth()
                .signInWithRedirect(provider)
            break;
        case AUTH_CHANGE_USER:
            return {
                ...state,
                currentUser: action.payload.user
            }
        case AUTH_SIGN_OUT:
            Firebase
                .auth()
                .signOut()

            return {
                ...state,
                currentUser: null
            }
    }
}
