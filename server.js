'use strict';


const express = require('express');
const cors = require('cors');
const { fetchWeatherData } = require('./weather');
const { fetchMoviesData } = require('./movies');

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());


app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

app.get('/weather/:lat_lon', async (req, res) => {
  const weatherDex = await fetchWeatherData(req.params.lat_lon);
  res.send(weatherDex);
});

app.get('/movies/:city', async (req, res) => {
  const moviesDex = await fetchMoviesData(req.params.city);
  res.send(moviesDex);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
