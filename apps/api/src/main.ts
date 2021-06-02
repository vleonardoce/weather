/* eslint-disable @typescript-eslint/no-var-requires */
import * as express from 'express';
import * as fs from 'fs';
import * as path from 'path';
const axios = require('axios');
const moment = require('moment');

import { Weather, City } from '@weather/api/util-models';

const app = express();
const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'assets/city.list.partial_PE_US.json'), 'utf8'));
// const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'assets/city.list.json'), 'utf8'));

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});

server.on('error', console.error);

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to api!' });
});

app.get('/api/countries', (req, res) => {
  const countries = data
    .flatMap(item => item.country)
    .filter((item, pos, self) => self.indexOf(item) == pos);
  res.status(200).send(countries);
});

app.get('/api/countries/:country/states', (req, res) => {
  const { country } = req.params;
  const states = data
    .filter(item => item.country === country)
    .flatMap(item => item.state)
    .filter((item, pos, self) => self.indexOf(item) == pos);
  res.status(200).send(states);
});

app.get('/api/countries/:country/states/:state/cities', (req, res) => {
  const { country, state } = req.params;
  const states = data.filter(item =>
    item.country === country && item.state === state
  );
  res.status(200).send(states);
});

app.get('/api/countries/:country/cities', (req, res) => {
  const { country } = req.params;
  const states = data.filter(item => item.country === country);
  res.status(200).send(states);
});

app.get('/api/cities/:id', (req, res) => {
  const { id } = req.params;
  axios.get(`https://api.openweathermap.org/data/2.5/forecast?id=${id}&units=metric&appid=cf53893d93414d0e98cabc620021f64f`)
    .then((response) => {


      const weathers = response.data.list.map((item: any) => {
        const date = moment(item.dt * 1000);
        return {
          day: date.format('dddd'),
          diff: new Date().getHours() - Number(date.format('HH')),
          tempMin: Math.round(item.main.temp_min),
          tempMax: Math.round(item.main.temp_max),
          icon: item.weather[0].icon
        };
      })

      // Just one forecast per day, prioritizing the closest time
      const first = weathers[0];
      const last = weathers.pop();
      const daysOneWeather = weathers.filter((item) => item.diff === first.diff);
      daysOneWeather.push(last);

      const data = {
        city: response.data.city as City,
        weathers: daysOneWeather as Weather[]
      }

      return res.status(200).send(data);
    })
    .catch(function (error) {
      return res.status(400).send(error);
    })
});

module.exports = { app, server };