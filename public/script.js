// ===== MOTION PREFERENCE =====
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

// ===== HTML ESCAPING (user-typed input can now reach innerHTML) =====
function escapeHtml(str) {
  return str.replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

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

  let built = '';
  output.innerHTML = '';
  updateLineCount();

  for (let char of text) {
    if (typingId !== currentTypingId) return;
    built += char;
    // Set from a local buffer rather than reading output.innerHTML back —
    // the getter re-serializes entities on every read, which double-escapes
    // any "&" introduced by escapeHtml() if accumulated via +=.
    output.innerHTML = built;
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

// ===== TITLE GLITCH =====
// Rare, subtle RGB-split glitch on the terminal title — off entirely if the
// user prefers reduced motion.
function scheduleTitleGlitch() {
  if (prefersReducedMotion) return;
  const titleEl = document.getElementById('titleText');
  if (!titleEl) return;

  const delay = 6000 + Math.random() * 9000; // every 6-15s
  setTimeout(() => {
    titleEl.classList.add('glitching');
    setTimeout(() => titleEl.classList.remove('glitching'), 160);
    scheduleTitleGlitch();
  }, delay);
}
scheduleTitleGlitch();

// ===== COMMAND LOADING SWEEP =====
function triggerLoadingSweep() {
  const bar = document.getElementById('loadingBar');
  if (!bar) return;
  bar.classList.remove('active');
  // Force reflow so the animation restarts on rapid repeat taps
  void bar.offsetWidth;
  bar.classList.add('active');
}

// ===== MOBILE TOUCH FEEDBACK =====
// iOS Safari doesn't reliably fire :active on tap, so drive immediate
// pressed-state feedback from touch events instead.
document.querySelectorAll('.cmd-btn').forEach(btn => {
  btn.addEventListener('touchstart', () => {
    btn.classList.add('touching');
    if (navigator.vibrate) {
      try { navigator.vibrate(8); } catch (e) { /* no-op */ }
    }
  }, { passive: true });

  const release = () => btn.classList.remove('touching');
  btn.addEventListener('touchend', release, { passive: true });
  btn.addEventListener('touchcancel', release, { passive: true });
});

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
  triggerLoadingSweep();

  const safeCmd = escapeHtml(cmd);

  if (cmd === 'stats') {
    await typeText('> Fetching live server stats...\n');
    const stats = await fetchStats();
    await typeText(`> stats\n\n${stats}`);
    return;
  }

  if (typeof commands !== 'undefined' && commands[cmd]) {
    await typeText(`> ${safeCmd}\n\n${commands[cmd]}`);
  } else {
    await typeText(`> ${safeCmd}\n\n  command not found. type 'help' to see available commands.`);
  }
}

function clearOutput() {
  currentTypingId++;
  triggerLoadingSweep();
  output.innerHTML = '';
  updateLineCount();
  document.querySelectorAll('.cmd-btn').forEach(btn => btn.classList.remove('active'));
  setTimeout(() => typeText('> Screen cleared.\n> Tap a command to begin.'), 100);
}

// ===== COMMAND LINE INPUT =====
// Commands shown in the sidebar/help text — the only ones Tab-autocompletes,
// so easter eggs in commands.js stay genuinely hidden.
const VISIBLE_COMMANDS = ['help', 'whoami', 'skills', 'projects', 'experience', 'contact', 'stats', 'clear'];

const cmdForm = document.getElementById('cmdForm');
const cmdInput = document.getElementById('cmdInput');

let commandHistory = [];
let historyIndex = 0;

function normalizeCmd(raw) {
  return raw.trim().toLowerCase().replace(/\s+/g, ' ');
}

async function submitCommand(raw) {
  const cmd = normalizeCmd(raw);
  if (!cmd) return;

  commandHistory.push(raw.trim());
  historyIndex = commandHistory.length;

  if (cmd === 'clear') {
    clearOutput();
    return;
  }

  await run(cmd);
}

if (cmdForm && cmdInput) {
  cmdForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = cmdInput.value;
    cmdInput.value = '';
    submitCommand(val);
  });

  cmdInput.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      historyIndex = Math.max(0, historyIndex - 1);
      cmdInput.value = commandHistory[historyIndex] ?? '';
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      historyIndex = Math.min(commandHistory.length, historyIndex + 1);
      cmdInput.value = commandHistory[historyIndex] ?? '';
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const partial = cmdInput.value.trim().toLowerCase();
      if (!partial) return;
      const match = VISIBLE_COMMANDS.find((c) => c.startsWith(partial));
      if (match) cmdInput.value = match;
    }
  });

  // Tapping anywhere in the output panel (not a button, not selecting text)
  // refocuses the command input, like clicking into a real terminal.
  document.querySelector('.output-panel')?.addEventListener('click', () => {
    if (window.getSelection().toString()) return;
    cmdInput.focus();
  });
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