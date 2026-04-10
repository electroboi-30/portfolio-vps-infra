const output = document.getElementById("output");
const input = document.getElementById("commandInput");

const commands = {
  help: `
Available commands:
whoami      - About me
skills      - My skills
projects    - My work
experience  - Experience
contact     - Contact info
stats       - Realtime Server Utilisation
clear       - Clear terminal
`,

  whoami: `
Pravin Nayakar
DevOps Engineer

I work with Linux, NGINX, Docker and cloud technologies.
Passionate about automation and scalable infrastructure.
`,

  skills: `
- Linux
- NGINX
- Docker
- Git & GitHub
- CI/CD
- AWS Basics
- Shell Scripting
- JavaScript
`,

  projects: `
1. NGINX Reverse Proxy
2. Dockerized Applications
3. VPS Hosting & Deployment
`,

  experience: `
TCS - Working professional

DevOps-focused engineer with a background in software development and hands-on experience in
Linux server management, web hosting, and deployment workflows. Skilled in configuring NGINX,
managing deployments using Git, and troubleshooting real-world production issues. Currently
expanding expertise in Docker and CI/CD.
`,

  contact: `
Email: pnayakar7@gmail.com
GitHub: github.com/electroboi-30
LinkedIn: linkedin.com/in/pravinnayakar
`,

stats: `

`
};

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
    const hours = Math.floor(mins / 60);
    const remainingMins = mins % 60;

    let uptimeText = "";
    if (hours > 0) {
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