// probe.js — minimal server to prove Railway wiring
const express = require('express');
const http = require('http');

const app = express();

// handy debug routes
app.get('/', (_req, res) => res.status(200).send('ok'));
app.get('/healthz', (_req, res) => res.status(200).json({ ok: true, ts: Date.now() }));
app.get('/env', (_req, res) => {
    res.json({
        cwd: process.cwd(),
        dirname: __dirname,
        portEnv: process.env.PORT,
        node: process.version,
    });
});

const server = http.createServer(app);
const PORT = process.env.PORT || 8081;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`PROBE listening on :${PORT}`);
});
