import zmq from "zeromq";

async function run() {
  const sock = new zmq.Publisher();

  await sock.bind("tcp://127.0.0.1:3000");
  console.log("Publisher bound to port 3000");

  while (true) {
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const currentDate = new Date().toLocaleString();
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const month_written = monthNames[today.getMonth()]; 
    const date = today.getDate();
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    
    const messages = {
      current_date: currentDate,
      current_year: year.toString(),
      current_month: month.toString(),
      current_day: date.toString(),
      current_date_formatted: `${month_written} ${date}, ${year}`,
      current_date_slashes_formatted: `${month}/${date}/${year}`,
      current_time: `${hours}:${minutes}:${seconds}`,
      current_hours: hours.toString(),
      current_minutes: minutes.toString(),
      current_seconds: seconds.toString(),
    }

    for (const [topic, message] of Object.entries(messages)) {
      console.log(`Sending ${topic}: ${message}`);
      await sock.send([topic, message]);
    }

    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });
  }
}

run();
