# Current Date and Time Microservice

This microservice provides the current date and time information in a few different formats using ZeroMQ's publisher-subscriber pattern. The service continuously sends date and time messages in different formats.

## Prerequisites
- **Node.js** installed on your system

## Installation

Clone the repository to your local machine:
   ```bash
   git clone https://github.com/yourusername/current-date-time-microservice.git
   cd current-date-time-microservice
```

## How to run

```
npm install
npm start
```

This command will start a ZeroMQ publisher bound to tcp://127.0.0.1:3000. You’ll see console logs for each message sent, with different date and time formats.

## Topics and Message Formats
The microservice publishes messages on the following topics:

- current_date: The full current date and time in the local format (e.g., MM/DD/YYYY, HH:MM:SS AM/PM)
- current_year: The current year (e.g., 2024)
- current_month: The current month as a number (e.g., 11 for November)
- current_day: The current day of the month (e.g., 1 for the 1st)
- current_date_formatted: The date in Month Day, Year format (e.g., November 1, 2024)
- current_date_slashes_formatted: The date in MM/DD/YYYY format (e.g., 11/01/2024)
- current_time: The current time as HH:MM:SS (e.g., 15:30:15)
- current_hours: The current hour (e.g., 9)
- current_minutes: The current minute (e.g., 30)
- current_seconds: The current second (e.g., 15)

## Example Subscriber Code

To receive messages from this microservice publisher, you need a ZeroMQ subscriber that connects to tcp://127.0.0.1:3000 and subscribes to date and time formats you need. Here’s an example:

```
import zmq from "zeromq";

async function run() {
  const sock = new zmq.Subscriber();
  sock.connect("tcp://127.0.0.1:3000");

  // Subscribe to specific topics (e.g., current_date, current_time)
  sock.subscribe("current_date");
  sock.subscribe("current_time");
  sock.subscribe("current_date_formatted");
  sock.subscribe("current_date_slashes_formatted");

  for await (const [topic, message] of sock) {
    console.log(`Received ${topic.toString()}: ${message.toString()}`);
  }
}

run();

```

<img width="650" alt="uml_sequence_diagram" src="https://github.com/user-attachments/assets/e120ab66-8000-4b21-a49a-7ee50d503cb6">



