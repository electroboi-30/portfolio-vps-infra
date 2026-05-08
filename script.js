// ===== CLOCK =====
function updateClock() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  const s = String(now.getSeconds()).padStart(2, '0');
  document.getElementById('clock').textContent = `${h}:${m}:${s}`;
}
setInterval(updateClock, 1000);
updateClock();

// ===== OUTPUT =====
const output = document.getElementById('output');

let lineCount = 0;

function updateLineCount() {
  const lines = output.innerText.split('\n').filter(l => l.trim()).length;
  document.getElementById('lineCount').textContent = `${lines} lines`;
}

function print(text) {
  output.innerHTML += text + '\n';
  output.scrollTop = output.scrollHeight;
  updateLineCount();
}

// ===== TYPING EFFECT =====
let currentTypingId = 0;

async function typeText(text) {
  currentTypingId++;
  const typingId = currentTypingId;

  output.innerHTML = '';
  updateLineCount();

  for (let char of text) {
    if (typingId !== currentTypingId) return;
    output.innerHTML += char;
    output.scrollTop = output.scrollHeight;
    await new Promise(r => setTimeout(r, 2));
  }

  updateLineCount();
}

// ===== STATS FETCH =====
async function fetchStats() {
  try {
    const res = await fetch('/api/stats');
    const data = await res.json();

    const mins = parseInt(data.uptime);
    const days = Math.floor(mins / 1440);
    const remainingAfterDays = mins % 1440;
    const hours = Math.floor(remainingAfterDays / 60);
    const remainingMins = remainingAfterDays % 60;

    let uptimeText = '';
    if (days > 0) {
      uptimeText = `${days} days ${hours} hrs ${remainingMins} mins`;
    } else if (hours > 0) {
      uptimeText = `${hours} hrs ${remainingMins} mins`;
    } else {
      uptimeText = `${remainingMins} mins`;
    }

    return `  CPU Usage : ${data.cpu}\n  RAM Usage : ${data.ram}\n  Uptime    : ${uptimeText}`;
  } catch {
    return '  Error fetching server stats.';
  }
}

// ===== BUTTON ACTIVE STATE =====
function setActiveBtn(label) {
  document.querySelectorAll('.cmd-btn').forEach(btn => btn.classList.remove('active'));
  const all = document.querySelectorAll('.cmd-btn');
  all.forEach(btn => {
    if (btn.querySelector('.btn-label')?.textContent === label) {
      btn.classList.add('active');
    }
  });
}

// ===== MAIN RUN =====
async function run(cmd) {
  currentTypingId++; // cancel any ongoing typing

  setActiveBtn(cmd);

  if (cmd === 'stats') {
    await typeText('> Fetching live server stats...\n');
    const stats = await fetchStats();
    await typeText(`> stats\n\n${stats}`);
    return;
  }

  if (typeof commands !== 'undefined' && commands[cmd]) {
    await typeText(`> ${cmd}\n\n${commands[cmd]}`);
  } else {
    await typeText(`> ${cmd}\n\n  command not found. type 'help' to see available commands.`);
  }
}

function clearOutput() {
  currentTypingId++;
  output.innerHTML = '';
  updateLineCount();
  document.querySelectorAll('.cmd-btn').forEach(btn => btn.classList.remove('active'));
  setTimeout(() => typeText('> Screen cleared.\n> Tap a command to begin.'), 100);
}

// ===== BOOT SEQUENCE =====
async function boot() {
  const lines = [
    '> Initializing terminal...',
    '> Loading profile: pravin@devops',
    '> Establishing secure connection...',
    '> Connection established.',
    '',
    '  Type or tap a command to begin.',
    '  Try [help] to get started.',
  ];

  for (const line of lines) {
    print(line);
    await new Promise(r => setTimeout(r, 120));
  }
}

boot();
