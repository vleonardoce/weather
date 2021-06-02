import { render } from '@testing-library/react';

import CityWeather from './city-weather';

describe('CityWeather', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CityWeather />);
    expect(baseElement).toBeTruthy();
  });
});
