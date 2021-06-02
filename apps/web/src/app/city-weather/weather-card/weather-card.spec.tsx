import { render } from '@testing-library/react';

import WeatherCard from './weather-card';

describe('WeatherCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WeatherCard />);
    expect(baseElement).toBeTruthy();
  });
});
