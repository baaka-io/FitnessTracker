import Config from "../config.toml"
importScripts("https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js")
importScripts("https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js")

if (firebase.messaging.isSupported()) {
  firebase.initializeApp(Config.firebase)
  const messaging = firebase.messaging()
}
