const output = document.getElementById("output");

let isTyping = false;
let currentTypingId = 0;

async function typeText(text) {
  currentTypingId++; // unique id for each run
  const typingId = currentTypingId;

  isTyping = true;
  output.innerHTML = "";

  for (let char of text) {

    // 🛑 stop if new command started
    if (typingId !== currentTypingId) return;

    output.innerHTML += char;
    await new Promise(r => setTimeout(r, 10));
  }

  isTyping = false;
}

async function run(cmd) {

  // cancel previous animation instantly
  currentTypingId++;

  if (cmd === "stats") {
    await typeText("> Fetching live stats...\n");

    try {
      const res = await fetch("/api/stats");
      const data = await res.json();

      await typeText(`
CPU Usage: ${data.cpu}
RAM Usage: ${data.ram}
Uptime: ${data.uptime}
`);
    } catch {
      await typeText("Error fetching stats");
    }
    return;
  }

  if (commands[cmd]) {
    await typeText(commands[cmd]);
  }
}

function clearOutput() {
  currentTypingId++; // cancel animation
  typeText("");
}