// Personal API Key for OpenWeatherMap API
const APIKEY = '3a80e1e55a2a7357a08a348de0a79c72';
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?units=metric&';

/* Function called by event listener */
const genData = async () => {
  const zipCode = document.getElementById('zip').value;
  getWeather(zipCode)
    .then((res) => {
      const path = '/submit';
      const data = {
        temp: res.main.temp,
        date: new Date().toISOString(),
        feelings: document.getElementById('feelings').value,
      };

      return addData(path, data);
    })
    .then((res) => {
      return updateUI(res);
    });
};
const fillEntryHolder = async () => {
  getData().then((res) => {
    return updateUI(res);
  });
};

/* Function to GET Web API Data*/
const getWeather = async (zipCode) => {
  const res = await fetch(baseURL + `zip=${zipCode}&appid=${APIKEY}`);
  return res.json();
};

/* Function to POST data */
const addData = async (path, userInput) => {
  const req = await fetch(path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userInput),
  });
  return req.json();
};

/* Function to GET Project Data */
const getData = async () => {
  const res = await fetch('/data');
  return res.json();
};

/* Function to update the document */
const updateUI = async (response) => {
  document.getElementById('date').innerHTML = response.date;
  document.getElementById('temp').innerHTML = response.temp;
  document.getElementById('content').innerHTML = response.feelings;
};

// Event listener to add function to existing HTML DOM element
window.addEventListener('load', fillEntryHolder);
document.getElementById('generate').addEventListener('click', genData);
