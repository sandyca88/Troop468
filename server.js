
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = process.env.PORT || 8080;

// Serve static files from the current directory
app.use(express.static(__dirname));

// For SPA routing: send index.html for any request that doesn't match a file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running and listening on port ${port}`);
});
