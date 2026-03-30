const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Folder where JSON files will be saved on the server
const SUBMISSIONS_DIR = path.join(__dirname, 'submissions');

// Create the submissions folder if it doesn't exist yet
if (!fs.existsSync(SUBMISSIONS_DIR)) {
  fs.mkdirSync(SUBMISSIONS_DIR, { recursive: true });
  console.log(`Created submissions folder at: ${SUBMISSIONS_DIR}`);
}

app.use(cors()); // Allow requests from your React app
app.use(express.json({ limit: '1mb' }));

// POST /submit — receives survey data and writes it to a JSON file
app.post('/submit', (req, res) => {
  try {
    const data = req.body;

    if (!data || typeof data !== 'object') {
      return res.status(400).json({ success: false, error: 'Invalid data received.' });
    }

    // Work out the next submission number by counting existing files
    const existingFiles = fs.readdirSync(SUBMISSIONS_DIR).filter(f => f.endsWith('.json'));
    const submissionNumber = existingFiles.length + 1;

    // Build a unique ID and filename
    const uniqueSuffix = Date.now().toString(36) + Math.random().toString(36).slice(2, 5);
    const filename = `submission_${String(submissionNumber).padStart(3, '0')}_${uniqueSuffix}.json`;
    const filepath = path.join(SUBMISSIONS_DIR, filename);

    // Wrap the survey data with useful metadata
    const payload = {
      _meta: {
        id: uniqueSuffix,
        filename,
        submission_number: submissionNumber,
        timestamp: new Date().toISOString(),
        ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
      },
      ...data,
    };

    // Write the file
    fs.writeFileSync(filepath, JSON.stringify(payload, null, 2), 'utf8');

    console.log(`[${payload._meta.timestamp}] Saved: ${filename}`);
    return res.status(200).json({ success: true, filename });

  } catch (err) {
    console.error('Error saving submission:', err);
    return res.status(500).json({ success: false, error: 'Failed to save submission.' });
  }
});

// GET /submissions — lists all saved submissions (useful for checking what's been collected)
app.get('/submissions', (req, res) => {
  try {
    const files = fs.readdirSync(SUBMISSIONS_DIR).filter(f => f.endsWith('.json'));
    res.json({ count: files.length, files });
  } catch (err) {
    res.status(500).json({ error: 'Could not list submissions.' });
  }
});

// Serve your built React app from the same server (optional, if you're not using a separate port)
 app.use(express.static(path.join(__dirname, 'build')));

app.listen(PORT, () => {
  console.log(`Survey server running on port ${PORT}`);
  console.log(`Submissions will be saved to: ${SUBMISSIONS_DIR}`);
});