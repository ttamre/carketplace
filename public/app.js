/**
 * Server entrypoint
 * 
 * Author: Tem Tamre
 * Contact: temtamre@gmail.com
 */

const express = require('express');
const bodyParser = require('body-parser');
const kijiji = require('../src/kijiji')

const app = express();
const port = 5000;

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())


// Serve main webpage
app.get('/', (req, res) => {
    res.sendFile('index.html', {root: __dirname});
});

// Serve login page
app.get('/login', (req, res) => {
    res.sendFile('login.html', {root: __dirname});
});

// Get user form data via POST request
app.post('/', (req, res) => {
    // TODO scrape kijiji autos
    kijiji.searchTestData(req.body);

    // TODO separate table creation into react frontend, then make POST request to get table data
    res.sendFile('index.html', {root: __dirname});
})



app.listen(port, () => {
    console.info(`Now listening on port ${port}`);
});