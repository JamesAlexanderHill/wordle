const path = require('path');
const dotenv = require('dotenv');
const express = require("express");
const cors = require('cors');

dotenv.config();

const PORT = process.env.PORT || 3001;
const app = express();

const api = require('./routes/api.js');


/**
 * Middleware
 */
app.use(cors());
app.use(express.static(path.resolve(__dirname, '../app/build')));
app.use('/api', api);

/**
 * Enpoints
 */
app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../app/build', 'index.html')));

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});