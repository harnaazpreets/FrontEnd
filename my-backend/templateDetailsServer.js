const express = require('express');
const { exec } = require('child_process');
const app = express();
const port = 3003; // Use the appropriate port for your server

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// Helper function to parse JSON part
function parseJSONPart(jsonPart) {
  let jsonOutput = '';
  let nonJsonOutput = '';
  let withinQuotes = false;
  for (let i = 0; i < jsonPart.length; i++) {
    const char = jsonPart[i];
    if (char === '"') {
      withinQuotes = !withinQuotes;
    }
    if (!withinQuotes) {
      jsonOutput += char;
    } else {
      nonJsonOutput += char;
    }
  }
  // Adjust JSON formatting
  jsonOutput = jsonOutput.replace('}, "', '}');
  return [jsonOutput, nonJsonOutput];
}

// Helper function to parse non-JSON part
function parseNonJSONPart(output) {
  const nonJsonStartIndex = output.indexOf('"');
  const nonJsonEndIndex = output.lastIndexOf('"') + 1;
  if (nonJsonStartIndex !== -1 && nonJsonEndIndex !== -1) {
    const nonJsonPart = output.substring(nonJsonStartIndex, nonJsonEndIndex);
    return nonJsonPart;
  } else {
    console.log("No non-JSON part found in the output.");
    return '';
  }
}

// Function to run command and parse output
function runCommandAndParseOutput(templateName, callback) {
    exec(`pros c get-branchline-template-versions ${templateName}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return callback(error, null, null);
        }

        let jsonOutput = null;
        let nonJsonOutput = '';

        // Attempt to find JSON part
        const jsonStartIndex = stdout.indexOf('[');
        const jsonEndIndex = stdout.lastIndexOf(']') + 1;
        if (jsonStartIndex !== -1 && jsonEndIndex !== -1) {
            const jsonPart = stdout.substring(jsonStartIndex, jsonEndIndex);
            console.log("Fetched JSON Part:", jsonPart); // Print fetched JSON part
            [jsonOutput, nonJsonOutput] = parseJSONPart(jsonPart);
            try {
                jsonOutput = JSON.parse(jsonOutput);
            } catch (parseError) {
                console.error('Parsing error:', parseError);
                return callback(parseError, null, null);
            }
            nonJsonOutput += stdout.replace(jsonPart, '').trim(); // Remove JSON part from stdout for non-JSON content
        } else {
            console.log("No JSON part found in the output.");
        }

        // Parse and print any remaining non-JSON part
        const additionalNonJsonOutput = parseNonJSONPart(stdout);
        nonJsonOutput += additionalNonJsonOutput;
        console.log("Fetched Non-JSON Part:", additionalNonJsonOutput); // Print additional non-JSON part

        callback(null, jsonOutput, nonJsonOutput);
    });
}

app.get('/api/templates/:templateName/versions', (req, res) => {
    const { templateName } = req.params;

    runCommandAndParseOutput(templateName, (error, versions, description) => {
        if (error) {
            return res.status(500).send('Error executing/processing PROS CLI command');
        }

        // Prepare dropdown menu HTML
        let dropdownHTML = '<select id="versionDropdown">';
        versions.forEach(version => {
            dropdownHTML += `<option value="${version.version}">${version.version}</option>`;
        });
        dropdownHTML += '</select>';

        // Prepare download button HTML
        const downloadButtonHTML = '<button id="downloadButton">Download</button>';

        // Prepare description HTML
        const descriptionHTML = `<div>${description}</div>`; // Assuming 'description' is plain text or processed Markdown

        // Combine all HTML for the response
        const htmlResponse = `${dropdownHTML}<br>${downloadButtonHTML}<br>${descriptionHTML}`;
        res.send(htmlResponse);
    });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
``

