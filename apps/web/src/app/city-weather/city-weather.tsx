import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './city-weather.scss';
import { City, Weather } from '@weather/api/util-models';
import WeatherCard from './weather-card/weather-card';
import {
  Button,
  CircularProgress,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Title } from '@weather/web/ui';

/* eslint-disable-next-line */
export interface CityWeatherProps {}

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    marginTop: 20,
  },
  back: {
    display: 'block',
    marginTop: 20,
  },
  loading: {
    display: 'block',
    margin: 20,
  },
  item: {
    margin: 20,
  },
  header: {
    marginBottom: 20,
  },
  paper: {
    padding: 20,
  },
});

export function CityWeather(props: CityWeatherProps) {
  const { id } = useParams();
  const classes = useStyles();
  const [weathers, setWeathers] = useState<{
    data: { city: City; weathers: Weather[] } | null;
    loadingState: 'init' | 'success' | 'loading' | 'error';
  }>({
    data: null,
    loadingState: 'init',
  });

  useEffect(() => {
    setWeathers({
      loadingState: 'loading',
      data: null,
    });
    fetch(`/api/cities/${id}`)
      .then((x) => x.json())
      .then((res) => {
        setWeathers({
          loadingState: 'success',
          data: res,
        });
      })
      .catch((err) => {
        setWeathers({
          loadingState: 'error',
          data: null,
        });
      });
  }, []);

  return (
    <div className={classes.root}>
      {weathers.loadingState === 'success' ? (
        <div>
          <Grid className={classes.header}>
            <Paper className={classes.paper}>
              <Title text={weathers.data?.city.name || ''} />
              <Typography>
                <strong>Country:</strong> {weathers.data?.city?.country}
              </Typography>
              <Typography>
                <strong>State:</strong> {weathers.data?.city.state || 'Unknown'}
              </Typography>
              <Typography>
                <strong>Lat:</strong>
                {weathers.data?.city.coord.lat}
              </Typography>
              <Typography>
                <strong>Lon:</strong>
                {weathers.data?.city.coord.lon}
              </Typography>
            </Paper>
          </Grid>

          <Grid container spacing={2}>
            {weathers.data?.weathers.map((weather) => (
              <Grid item xs={2} spacing={2}>
                <WeatherCard data={weather} />
              </Grid>
            ))}
          </Grid>
        </div>
      ) : weathers.loadingState === 'loading' ? (
        <CircularProgress className={classes.loading} />
      ) : weathers.loadingState === 'error' ? (
        <div>Error loading data</div>
      ) : (
        <div></div>
      )}

      <Link className={classes.back} to="/">
        <Button variant="contained" color="primary">
          Back
        </Button>
      </Link>
    </div>
  );
}

export default CityWeather;
