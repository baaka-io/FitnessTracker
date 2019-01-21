import Timer from "tiny-timer";

const timer = new Timer({ stopwatch: true })

timer.on('tick', ms => {
    self.postMessage(ms)
})

timer.start(60 * 60 * 1000)