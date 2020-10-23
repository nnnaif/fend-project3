// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');

const bodyParser = require('body-parser');
const cors = require('cors');

// Start up an instance of app
const app = express();
const port = 3000;

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Routes
app.get('/data', (req, res) => {
  // return data if available, else return empty object
  res.send(
    Object.keys(projectData).length === 0
      ? {
          temp: 0,
          date: 0,
          feelings: 'Generate an entry first',
        }
      : projectData,
  );
});
app.post('/submit', (req, res) => {
  const userInput = {
    temp: req.body.temp,
    date: req.body.date,
    feelings: req.body.feelings,
  };
  projectData = userInput;

  res.send(projectData);
});

// Setup Server
app.listen(port, () => {
  console.log(`app listening on http://localhost:${port}`);
});
