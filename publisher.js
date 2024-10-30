const zmq = require("zeromq");

async function run() {
  const sock = new zmq.Publisher();

  await sock.bind("tcp://127.0.0.1:3000");
  console.log("Publisher bound to port 3000");

  while (true) {
    const currentDate = new Date().toLocaleString();
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    console.log("sending the current date and time");
    await sock.send(["current_time", currentDate]);
    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });
  }
}

run();
