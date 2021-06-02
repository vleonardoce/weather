import './app.scss';
import { Switch, Route } from 'react-router-dom';
import FindCity from './find-city/find-city';
import CityWeather from './city-weather/city-weather';
import { Header } from '@weather/web/ui';
import { Container } from '@material-ui/core';

export function App() {
  return (
    <div>
      <Header></Header>
      <Container>
        <Switch>
          <Route exact path="/">
            <FindCity />
          </Route>
          <Route path="/city/:id">
            <CityWeather />
          </Route>
        </Switch>
      </Container>
    </div>
  );
}

export default App;
