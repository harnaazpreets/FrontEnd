// templatesServer.js
const express = require('express');
const { exec } = require('child_process');
const app = express();
const port = 3002; // Use a different port than the details server

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.get('/api/templates', (req, res) => {
    exec('pros c get-branchline-templates', (error, stdout) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return res.status(500).send('Error executing PROS CLI command');
        }
        // Assume stdout is properly formatted JSON
      try {
            const templates = JSON.parse(stdout);
            res.json(templates);
        } catch (error) {
            console.error('JSON parsing error:', error);
            res.status(500).send('Error parsing templates data');
        }
    });
});

app.listen(port, () => {
    console.log(`Templates server listening at http://localhost:${port}`);
});
