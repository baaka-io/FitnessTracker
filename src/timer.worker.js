import Timer from "tiny-timer";
import Config from "../config.toml"
import Icon from "../assets/icon.png"

const timer = new Timer({ stopwatch: true })
let token = "cZdW13VnjBM:APA91bGy4qg7iZOOT7ZebcEr-gtqd8SPdUsx8jvBua6WHBzDMXRV1NsO8B-_a8il0isJENZS46BVZZ3FLNV5uKal7of7dR4dNVKEeRDEp-KqmFEcLgXa9OXkZ2hkxhZmUsy_kfAiV2tR"
let isBreak = false
let maxBreakDuration = null
let breakStartTime = null

timer.on('tick', ms => {
    self.postMessage(ms)
    let url = `https://fcm.googleapis.com/fcm/send`
    const body = {
        to: token,
        notification: {
            title: "Break Notification",
            body: "You reached your maximum break duration",
            badge: Icon,
            icon: Icon
        }
    }

    const seconds = Math.floor(ms/1000)


    if(isBreak && maxBreakDuration && breakStartTime){
        if(maxBreakDuration == (seconds - breakStartTime)){
            fetch(url, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "key=" + Config.firebase_messaging.serverKey
                },
                body: JSON.stringify(body)
            })
        }
    }
})

self.onmessage = message => {
    isBreak = message.data[0]
    maxBreakDuration = message.data[1]
    breakStartTime = message.data[2]
} 

timer.start(60 * 60 * 1000)