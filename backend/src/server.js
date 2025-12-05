require('dotenv').config();
const app = require('./app');
const config = require('./config');

const port = config.port || 4000;

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
