import {
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './find-city.scss';
import { Title } from '@weather/web/ui';
import { City } from '@weather/api/util-models';

/* eslint-disable-next-line */
export interface FindCityProps {}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(4),
  },
  formControl: {
    margin: theme.spacing(2),
    width: 300,
  },
  button: {
    margin: theme.spacing(2),
  },
  loading: {
    margin: theme.spacing(2),
  },
}));

export function FindCity(props: FindCityProps) {
  const [countries, setCountries] = useState<string[]>([]);
  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<{
    data: City[];
    loadingState: 'init' | 'success' | 'loading' | 'error';
  }>({
    data: [],
    loadingState: 'init',
  });
  const [cityRows, setCityRows] = useState<City[]>([]);
  const [country, setCountry] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    fetch('/api/countries')
      .then((x) => x.json())
      .then((res) => {
        setCountries(res);
      })
      .catch((err) => {
        setCities({
          data: [],
          loadingState: 'error',
        });
      });
  }, []);

  function getStates(country: string): void {
    setCities({
      loadingState: 'loading',
      data: [],
    });

    fetch(`/api/countries/${country}/states`)
      .then((x) => x.json())
      .then((res: string[]) => {
        setStates(res);
        if (res.length === 1 && res[0] === '') {
          getCitiesByCountry(country);
        } else {
          setCityRows([]);
          setCities({
            loadingState: 'success',
            data: [],
          });
        }
      })
      .catch((err) => {
        setCities({
          data: [],
          loadingState: 'error',
        });
      });
  }

  function getCitiesByCountry(country: string): void {
    fetch(`/api/countries/${country}/cities`)
      .then((x) => x.json())
      .then((res: City[]) => {
        setCityRows(res);
        setCities({
          ...cities,
          data: res,
          loadingState: 'success',
        });
      })
      .catch((err) => {
        setCities({
          data: [],
          loadingState: 'error',
        });
      });
  }

  function getCitiesByState(state: string): void {
    setCities({
      loadingState: 'loading',
      data: [],
    });

    fetch(`/api/countries/${country}/states/${state}/cities`)
      .then((x) => x.json())
      .then((res: City[]) => {
        setCityRows(res);
        setCities({
          ...cities,
          data: res,
          loadingState: 'success',
        });
      })
      .catch((err) => {
        setCities({
          data: [],
          loadingState: 'error',
        });
      });
  }

  function filterCities(): void {
    const found = cities.data.filter((city) =>
      city.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
    );
    setCityRows(found);
  }

  const classes = useStyles();

  const countryChange = (event: any) => {
    const country = event.target.value;
    setCountry(country);
    getStates(country);
  };

  const stateChange = (event: any) => {
    const state = event.target.value;
    setState(state);
    getCitiesByState(state);
  };

  const searchTermChange = (event: any) => {
    setSearchTerm(event.target.value);
  };

  const searchClick = () => {
    filterCities();
  };

  return (
    <div>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Title text="Filter" />
          <Grid container spacing={2}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="country-select-label">Country</InputLabel>
              <Select
                labelId="country-select-label"
                id="country-select"
                value={country}
                onChange={countryChange}
                label="Country"
              >
                {countries.map((country: string) => (
                  <MenuItem key={'country-' + country} value={country}>
                    {country}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="state-select-label">State</InputLabel>
              <Select
                labelId="state-select-label"
                id="state-select"
                value={state}
                onChange={stateChange}
                label="State"
              >
                {states.map((state: string) => (
                  <MenuItem key={'state-' + state} value={state}>
                    {state}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Paper>
      </Grid>

      {cities.loadingState === 'success' && cities.data.length > 1 ? (
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Grid
              container
              spacing={2}
              direction="row"
              justify="flex-start"
              alignItems="flex-start"
            >
              <TextField
                className={classes.formControl}
                id="search-term"
                label="Search City"
                variant="outlined"
                onChange={searchTermChange}
              />

              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                size="large"
                onClick={searchClick}
              >
                Search
              </Button>
            </Grid>

            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>State</TableCell>
                  <TableCell>Country</TableCell>
                  <TableCell>Lng</TableCell>
                  <TableCell>Lat</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cityRows.map((row) => (
                  <TableRow key={'city-' + row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.state}</TableCell>
                    <TableCell>{row.country}</TableCell>
                    <TableCell>{row.coord.lon}</TableCell>
                    <TableCell>{row.coord.lat}</TableCell>
                    <TableCell>
                      <Link to={`city/${row.id}`}>
                        <Button variant="contained" color="primary">
                          View
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      ) : cities.loadingState === 'loading' ? (
        <CircularProgress className={classes.loading} />
      ) : cities.loadingState === 'error' ? (
        <div>Error loading data</div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default FindCity;
