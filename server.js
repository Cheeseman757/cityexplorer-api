'use strict';

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // cross origin resource sharing tool
const weatherData = require('./weather.json');

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());

class Forecast {
  constructor(date, description, high, low) {
    this.date = date;
    this.description = description;
    this.high = high;
    this.low = low;
  }
}

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

app.get('/weather/:lat_lon', (req, res) => {
  const lat = req.params.lat_lon.split('_')[0];
  const lon = req.params.lat_lon.split('_')[1];
  const foundCity = weatherData.find(city => city.lat === lat && city.lon === lon);

  if (!foundCity) {
    return res.status(404).json({error: 'City not found. Please search for Seattle, Paris, or Amman.'});
  } else {
    let weatherDex = foundCity.data.map((values) => {
      return new Forecast(values.datetime, values.weather.description, values.max_temp, values.min_temp);
    });

    res.send(weatherDex);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
