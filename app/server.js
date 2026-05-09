const express = require("express");
const os = require("os");
const osu = require("os-utils");

const app = express();  // app is defined first

app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));  // then routes

app.get("/stats", (req, res) => {
  osu.cpuUsage(function(cpu) {
    res.json({
      cpu: (cpu * 100).toFixed(2) + "%",
      ram: ((1 - os.freemem() / os.totalmem()) * 100).toFixed(2) + "%",
      uptime: (os.uptime() / 60).toFixed(0) + " mins"
    });
  });
});

app.listen(3000, () => console.log("API running on port 3000"));
