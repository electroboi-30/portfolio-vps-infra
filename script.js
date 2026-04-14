const output = document.getElementById("output");
const input = document.getElementById("commandInput");

function print(text) {
  output.innerHTML += text + "\n";
  output.scrollTop = output.scrollHeight;
}

async function fetchStats() {
  try {
    const res = await fetch("/api/stats");
    const data = await res.json();

    // Convert uptime from mins → hrs + mins
    const mins = parseInt(data.uptime);
    const days= Math.floor(mins/1440)
    const remainingAfterDays = mins % 1440;
    const hours = Math.floor(remainingAfterDays / 60);
    const remainingMins = remainingAfterDays % 60;

    let uptimeText = "";
    if(days > 0){
      uptimeText = `${days} days ${hours} hrs ${remainingMins} mins`;
    }
    else if (hours > 0) {
      uptimeText = `${hours} hrs ${remainingMins} mins`;
    } else {
      uptimeText = `${remainingMins} mins`;
    }

    return `
CPU Usage: ${data.cpu}
RAM Usage: ${data.ram}
Uptime: ${uptimeText}
`;
  } catch (err) {
    return "Error fetching server stats";
  }
}

input.addEventListener("keydown", async function(e) {
  if (e.key === "Enter") {
    const cmd = input.value.trim();

    print(`pravin@devops:~$ ${cmd}`);

  if (cmd === "clear") {
    output.innerHTML = "";

    setTimeout(() => print("Clearing screen..."), 100);
    setTimeout(() => print("Type 'help' to begin.\n"), 500);
  } 
    else if (cmd === "stats") {
      print("Fetching live server stats...\n");
      const stats = await fetchStats();
      print(stats);
    }
    else if (commands[cmd]) {
      print(commands[cmd]);
    } 
    else {
      print("Command not found. Type 'help'");
    }

    input.value = "";
  }
});

// Initial welcome message
print("Welcome to Pravin's DevOps Terminal");
print("Type 'help' to get started.\n");