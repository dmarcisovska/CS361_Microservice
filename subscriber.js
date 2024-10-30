const zmq = require("zeromq");

async function run() {
  const sock = new zmq.Subscriber();

  sock.connect("tcp://127.0.0.1:3000");

  //subscriber options
  // sock.subscribe("current_date");
  // sock.subscribe("current_year");
  // sock.subscribe("current_month");
  // sock.subscribe("current_day");
  // sock.subscribe("current_time");
  sock.subscribe("current_date_formatted");
  sock.subscribe("current_date_slashes_formatted");
  // sock.subscribe("current_hours");
  // sock.subscribe("current_minutes");
  // sock.subscribe("current_seconds");

  console.log("Subscriber connected to port 3000");

  for await (const [topic, msg] of sock) {
    console.log(
      topic.toString(),
      ":",
      msg.toString()
    );
  }
}

run();
