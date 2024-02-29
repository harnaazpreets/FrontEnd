const express = require('express');
const { exec } = require('child_process');
const app = express();
const port = 3001; // Feel free to use any available port

// Allow CORS for development convenience
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/api/templates', (req, res) => {
  exec('pros c get-branchline-templates', (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.status(500).send('Error executing PROS CLI command');
    }
    try {
      const templates = JSON.parse(stdout);
      res.json(templates);
    } catch (parseError) {
      console.error('Parsing error:', parseError);
      res.status(500).send('Error parsing templates data');
    }
  });
});

app.get('/api/templates/:templateName/versions', (req, res) => {
  const { templateName } = req.params;
  exec(`pros c get-branchline-template-versions ${templateName}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.status(500).send('Error executing PROS CLI command for template versions');
    }
    try {
      const versions = JSON.parse(stdout);
      res.json(versions);
    } catch (parseError) {
      console.error('Parsing error:', parseError);
      res.status(500).send('Error parsing template versions data');
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
