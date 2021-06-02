import {
  Button,
  Card,
  CardActions,
  CardContent,
  makeStyles,
  Typography,
} from '@material-ui/core';
import './weather-card.scss';
import { Weather } from '@weather/api/util-models';

/* eslint-disable-next-line */
export interface WeatherCardProps {
  data: Weather;
}

const useStyles = makeStyles({
  content: {
    padding: 20,
  },
  title: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 20,
  },
  icon: {
    textAlign: 'center',
    width: '100%',
  },
  tempBox: {
    width: 'full',
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    fontSize: 20,
    color: 'gray',
  },
  tempBoxRight: {
    float: 'right',
  },
  tempBoxLeft: {
    float: 'left',
  },
});

export function WeatherCard(props: WeatherCardProps) {
  const classes = useStyles();

  return (
    <Card>
      <CardContent className={classes.content}>
        <Typography className={classes.title}>{props.data.day}</Typography>

        <img
          className={classes.icon}
          src={`http://openweathermap.org/img/wn/${props.data.icon}@4x.png`}
          alt="Weather Icon"
        ></img>

        <section className={classes.tempBox}>
          <span className={classes.tempBoxLeft}>{props.data.tempMin}°</span>
          <span className={classes.tempBoxRight}>{props.data.tempMax}°</span>
        </section>
      </CardContent>
    </Card>
  );
}

export default WeatherCard;
