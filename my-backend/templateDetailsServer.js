const express = require('express');
const { exec } = require('child_process');
const app = express();
const port = 3003; // Use the appropriate port for your server

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// Function to run command and parse output
function runCommandAndParseOutput(templateName, callback) {
    exec(`pros c get-branchline-template-versions ${templateName}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return callback(error, null, null);
        }

        const jsonOutput = JSON.parse(stdout);

        callback(null, jsonOutput);
    });
}

app.get('/api/templates/:templateName/versions', (req, res) => {
    const { templateName } = req.params;

    runCommandAndParseOutput(templateName, (error, jsonOutput) => {
        if (error) {
            return res.status(500).send('Error executing/processing PROS CLI command');
        }

        res.send(jsonOutput);
    });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
``

