const zmq = require("zeromq")

async function run() {
  const sock = new zmq.Publisher()

  await sock.bind("tcp://127.0.0.1:3000")
  console.log("Publisher bound to port 3000")

  while (true) {
    const currentDate = new Date().toLocaleString();
    console.log("sending the current date and time")
    await sock.send(["current_time", currentDate])
    await new Promise(resolve => {
      setTimeout(resolve, 500)
    })
  }
}

run()